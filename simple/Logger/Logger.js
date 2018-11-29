import simple, {is, el, div} from "/simple/simple.js";

class Logify {
	constructor(obj){
		obj.proxy = this.proxy = new Proxy(obj, {
			get(ctx, prop, prox){
				// debugger;
				const value = ctx[prop];
				if ((typeof value === "function") && ["constructor", "hasOwnProperty"].indexOf(prop) === -1){
					
					// if (!ctx.hasOwnProperty("_methods"))
					// 	ctx._methods = {};

					// if (!ctx._methods[prop] 
						// || ctx._methods[prop]._self !== value ){
						// console.log("making new proxy for method", prop);
						// debugger;
						// ctx._methods[prop] = 
						return new Proxy(value, {
							apply(fn, ctx, args){
								var value, largs = ["."+prop+"("].concat(args, ")");
								// var log = ctx.log;
								console.group.apply(console, largs);
								div(
									div(largs.map(v => v.toString())), 
									div(() => {
										value = fn.apply(ctx, args);

										if (simple.is.def(value))
											div("return ", value.toString());
									})
								);
								// var value = fn.apply(ctx, args);
								console.groupEnd();
								return value;
							}
						});

						// ctx._methods[prop]._self = value;
					// }

					// return ctx._methods[prop];
				} else {
					return value;
				}
			},
			set(ctx, prop, value, prox){
				console.log("set", ctx, prop, value);
				ctx[prop] = value;
				return true; // important
			}
		});
	}

	static classify(cls){
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

/*
If the debug base requires the constructs to config proxying, then you can't have arbitrary constructor args?

I think that's one good reason to just stick to assignments only...
*/

export default class DebugBase {
	// constructor(...args){
	// 	this.instantiate(...args);
	// }
	constructor(){
		return this.__config(...arguments);
	}

	__config(o){
		var self;
		if (is.pojo(o) && is.def(o.log)){

		}
		this.assign(...arguments);
		if (this._log){
			self = new Logify(this).proxy;
		} else {
			self = this;
		}
		self.instantiate(...arguments);
		return self;
	}
	constructor(...args){
	}

	constructor(o){
			this.__config_log(o.log)
		
		return this.__config(o);
	}

	__config(o){
	}

	instantiate(){
	}

	initialize(){}
	
	assign(...args){
		return Object.assign(this, ...args);
	}
}

DebugBase.Logify = Logify;


class MyClass extends DebugBase {
	constructor(){
		// ? can't override?
	}
}


// class LoggerAPI {
// 	msg(){ console.error("must override"); }
// 	if(){ console.error("must override"); }
// 	group(){ console.error("must override"); }
// }

// class Logger extends LoggerAPI {}

// class NoopLogger extends LoggerAPI {
// 	msg(){}
// 	if(){}
// 	group(){}
// }


/*

How to sync method config?

The log() and noop don't need to be instances, because they need to be functions.
And so you could map all the methods over, but that's just confusing.
I think, instead, you could just have one log() and one noop, which creates Log instances, which can track the timestamp, create shallow copies, etc.


The best way might be to just crank out a new proxy fn for every get?

And then to dynamically access the config *during* each proxy call...
Instead of trying to cache/sync..


_log = true, false, "auto", {
	log: true, false, "auto",
	methods: {
		method_name: true, false, "auto", {
			log: true, false, "auto",
			args: true, false, "auto"
		} 
	}
}


_log: {
	log: true, // turn everything on (and activate all subs)
	methods: {
		method_name: false // turn this off (and deactivate all subs)
	}
}

_log: {
	log: false, // turn everythign off (recursively)
	method_name: true // turn this on (recursively)
}

_log: {
	// stays at "auto"?  or just inherits from base
	method_name: true // activate just this method
	method_name: false // always silence this method, regardless of global state?
}

The problem with this, is that there's only 1 level of on/off...
You'd almost need log: -5 and log: +3?

If the parent level squelches at -5, a +3 doesn't work.
But a +3 and then another +3 turns it on?
Or its all absolute?  You'd need a +5?

Or squelching wins the tie, so you'd need a +6?

How would that work?

I think moving towards a UI that can config them in a more intuitive way is better.
It doesn't solve the problem that you still need the logic - how do you UI-ify the conditions?  What are the conditions?  Why can't we encode them with simple objects?

1)  class-based log config

class Thing extends DebugBase {}
Thing.prototype._log = {}; // base log config

class Thing2 extends Thing {}
Thing2.prototype._log = Thing.

2) instance-based log config

inherits from class



"auto" mode:
	log() calls are maybe-logged, depending on config, and depending on switches

if you turn logging for a particular method on, do you automatically turn on all logging within that method?  it might not be a bad idea...  but it might be a bad idea (it might kill the app).


default -> auto
log: true --> active
	--> force on all inactive logs, temporarily
log: false --> inactive
	--> force off all active logs, temporarily

	these can happen for the instance (all methods), or per method

How would it work?
get log() would have to pass this._log_config to the logger() function?

var log = logger(); // auto
var log = logger(true); // on, and force on all auto loggers
var log = logger(false); // off, and force off all auto loggers

var log = logger({}); // config?


I think the standalone log() and the OO this.log() might have to be different?

We could Map or even WeakMap the log config to each object, but that seems a little crazy...

Or we could just have .log_config {}?


Configuring the Proxy:

Do we cache the methods?  Where?
 - every get() must check the cache?


Main Pieces:

auto-log
	instances
	methods

noop vs active pattern

config logger per class or per instance



So what do we need here?

Do we need a dynamically accessed this.log?  That's one way to config..
If we use `this.log()`, we have access to this...
If we move it off, const log = this.log, then we don't.

But, we could probably bind it in, one way or another...?

The console.logger was nice and simple to have a noop api.  And any other logger might be best off to follow the same pattern...

this.log ==> noop vs active

What about config?
- per-method config?
- mid-method config?
- global config?

on/off? per instance? per method? per statement?

log.off(); // permanently off?
log.off(()=> {
	// block these logs?
});


!!! Defaults vs Toggleable !!!

classes can have lots of logs in them, without them showing up anywhere, and hopefully without slowing things down too much.

Maybe we even leave all the logs in the classes, without templatizing?

Turn on logging per instance:

new Thing({ log: true }); // --> activates logging and rendering
new Thing({
	log: {
		log: true/false,
		render: true/false,
		methods: {
			method_name: false
		}
	}
});


Where are logs rendered?
- either in place (whoever catches them)
or
- create a root logger view...

log.render() --> renders in place...
log.render().appendTo(document.body); //? 


In order for server side logging to work...
We need to capture logging without rendering.
Or, at least, the rendering doesn't happen server-side.

To do server-side --> socket --> client-side rendering, we need to... just render html?
But that doesn't work for behaviors.

Send and eval() code?  No...
Load the module (class) on the client-side?

Eval isn't a terrible option... server_render_fn.toString() --> socket --> eval()

Ideally, we could step through code on the server side, and see the output client side in realtime...



Log vs Logger
	Loggers are the actual API that creates the Log
	sort of like div() vs View

Is each log also a logger? 
The log() api methods would just forward to the Logger.captor?

So each log() call creates a new Log instance.  And each log instance has the full api?


Log API

log() // default

log("str") vs log.msg("hello")
log(true) ==> boolean
log(false) ==> boolean
log(undefined) ==> undefined
log(null) ==> null...
log(pojo) ==> Object {...}
log(inst) ==> Thing {...}
log(arr) ==> [...]
log("str", str) ==> this would work, but might look funny
log.var("name", name);
log.expr("a > b", a > b)
log.cond(a > b, "a > b")

// if log() returns the first value, you can use it like this:

if (something()) ==> if (log(something()))

log.if(something()).then(() => {
	
});

// if (something()){
log.if(something()).then({
	
})
// }

// but if you want to be able to chain it...
// some methods might not return the value?
log.if(something()).then(() => {
	...
});

log.g() // create a group
	log.g("name", () => {
		// auto group
		// careful - arguments keyword will be different in here
	}) // or
	log.g("name"); // without a fn, we must close it
	log.end("name");
log.levels ?

log.methods?

log.time()
log.info()
log.warn()
log.error()
log.trace()

log.inst() // new instance?
log.class() // class {}

log.method(obj, "methodName", ...args) => value? or log.fn()
	log.args()
	log.group()
	log.ret()

log.for_in(pojoProps, (propName, propValue) => {
	
});




What kind of functionality?

For more advanced situations, we might want advanced logging:
this.log.if() // conditional logging, or logging a condition?
this.log.if(condition, "condition").then(fn(){})
	.else_if(cond, "cond").then(fn(){})
	.else(fn(){});

this.log.if(val, "val").and(another, "another").then(fn(){});
this.log.if(val && another).then(fn(){});
this.log.if(val).and(another).then(fn(){});
this.log.if(val).gt(another)
this.log.if(val).gte(another)...

const log = this.log;

log.if(...);
log.if(log(a, "a").and(b, "b").or(log(c).not())


So, every log method returns a chainable log object that links back to the last value?
	- Either you reuse a single object (and then you can't have async chaining)
	- or, you have to create a new object for each log...
		- which isn't efficient, but might be easiest...

{ log: true } // => turn on synchronous capture/rendering, so that you can step through it as its running...

Without log set to true, the log can be toggled via settings, so its not permanently on.
	And temporary settings can be organized into profiles
	And temporary settings can simply toggle persistent profiles, so you don't have to manually config everything every time...

When you turn logging on, `this.log()` simple create and returns a new Log instance which gets captured, and creates the log.  Nothing is rendered, unless sync rendering is turned on (which might be most useful/default).
	this.log() --> capture into nested log structure --> render immediately, into appropriate view





this.log() --> simple console logger?
	or, create a view?

Tag each log statement?
this.log.tag("something", ...args);
	// allows you to toggle on/off these log statements?

Load log configs dynamically (fetch .json, or export {} js)

When writing the file, we can just write

export default {
	"actually": "just json",
	"but wrapped in a js": "wrapper",
	"so we can import it": "without hassle",
	"and it acts like": "a std dep"
}


So, if we save the log config dynamically, it can persist to the system, and it'll be there forever (regardless of session).

We can specifically put things in session that we DONT want to save...?
And move them between FS and SESSION as desired...

Create log profiles:
Basically a name => config

The raw settings data can just be name => config?
Or maybe some meta, and then "profiles": { n => config }

And they could be stacked:

"nested_profile": {
	"deps": ["other_profile1", "other_profile2"],
	"base": ["other_profile2", "other_profile1", "my_config_fn"] // defines the order
		// if its not defined locally, we could automatically climb the hierarchy to try and find a setting name that matches...

	// can we have functional config?
	"my_config_fn": { type: "Function", args: ["arg", "names"], fn: "return arg + names;" }
}



## Objective:  streaming logs from server to client

- Configurable, so you can turn off various parts of the stream:
- Collect the full log and render on demand?
- Only subscribe to individual objects, and maybe individual sub streams?
- But now the whole config system needs to be remotely configurable....

If you config via a function, you need to transport this config to the server.
Otherwise you're just subscribing to everything, and only rendering pieces.
Which might be easier in the short term.

Anyway, the socket needs to be dynamic.
In the initial handshake's, we config what we're subscribing to.

I suppose the socket could setup a generic pipeline, and the server can arbitrarily publish log data...

This way, we're able to just log() on the server, and it automatically works...

And then we decouple the render process, so that config/re

1. session/config
2. pass client-side session config to server
3. add client-side config to defaults
4. use the log() and log.methods(), and they're automatically configured from the server...



class Data {}
- requires a .path (/url/path/ === /fs/path/)
- lives on both client and server
- creates a /data/ dir in fs
- client-side modules can easily load all data, and save new items to the /data/ dir
- /data/ can later be configured in different dir for easier access

Each /data/file and /data/dir/ must be legit javascript names

module.data.file === string contents?
module.data.file (if it's file.json) becomes parsed json...
module.data.dir.file...

or maybe it's just an FS class


class FS {
	.path
	.move()
	.delete()
	.read()
	.write()
	.update()
}
class File extends FS {}
class Dir extends FS {}


*/