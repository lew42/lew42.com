export default function mixin(cls, ...mixins){
	Object.assign(cls.prototype, ...mixins);
	return cls;
};

export const assign = {
	assign(...args){
		return Object.assign(this, ...args);
	}
};

export const events = {
	on(event, cb){
		if (!cb) return this;
		this._events = this._events || {};
		(this._events[event] = this._events[event] || []).push(cb);
		return this;
	},

	emit(event, ...args){
		const cbs = this._events && this._events[event];
		if (cbs && cbs.length)
			for (const cb of cbs)
				cb.apply(this, args);
		return this;
	},

	off(event, cbForRemoval){
		const cbs = this._events && this._events[event];
		if (cbs)
			for (var i = 0; i < cbs.length; i++)
				if (cbs[i] === cbForRemoval)
					cbs.splice(i, 1);
		return this;
	}
};