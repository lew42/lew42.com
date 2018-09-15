class Logger {
	constructor(obj){
		this.proxy = new Proxy(obj, {
			get(ctx, prop, prox){
				const value = ctx[prop];
				if ((typeof value === "function") && ["constructor", "hasOwnProperty"].indexOf(prop) === -1){
					return new Proxy(value, {
						apply(fn, ctx, args){
							var largs = ["."+prop+"("].concat(args, ")");
							// var log = ctx.log;
							console.group.apply(console, largs);
							var value = fn.apply(ctx, args);
							console.groupEnd();
							return value;
						}
					});
				}
			},
			set(ctx, prop, value, prox){
				console.log("set", ctx, prop, value);
				ctx[prop] = value;
				return true; // important
			}
		});
	}

	static construct(cls){
		return new Proxy(cls, {
			construct(cls, args){
				console.group("new " + cls.name, args);
				const instance = new cls(...args);
				console.groupEnd();
				return instance;
			}
		});
	}
}

export default Logger.construct(class DebugBase {
	constructor(){
		return this.instantiate(...arguments);
	}

	instantiate(){
		this.assign(...arguments);
		const self = new Logger(this).proxy;
		self.initialize();
		return self;
	}

	initialize(){}
	
	assign(...args){
		return Object.assign(this, ...args);
	}
})