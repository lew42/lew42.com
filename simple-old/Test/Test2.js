import "../dev/livereload.js";
import "/simple/dev/dev.js";
import "/simple/css/css.js";
import mixin, { assign } from "../mixin.js";
import { is } from "/simple/util.js";
import View, { el, div } from "../View/View.js";

import stacktrace from "./stacktrace.js";

import TestView from "./TestView.js";
import TestPager from "./TestPager.js";

View.stylesheet("/simple/Test/Test.css");

export default class Test {
	constructor(...args){
		if (is.str(args[0])){
			this.name = args[0];
			this.fn = args[1];
		} else {
			this.trace = stacktrace()[2];
			this.assign(...args);
		}

		this.tests = {};
		this.pass = 0;
		this.fail = 0;

		this.container = this.container || document.body;

		// if (this.shouldRun())
		// 	this.render();
	}

	render(){
		if (this.fn){
			return new this.constructor.View({
				test: this
			});
		} else {
			return new this.constructor.Pager({
				test: this
			});
		}
	}

	activate(){
		window.location.hash = this.name;
		window.location.reload();
	}

	label(){
		return (this.name || this.trace.file) + (this.preview ? " preview" : "");
	}

	maybe_run(){
		if (this.shouldRun())
			this.run();
	}

	_before(){
		console.group(this.label());
		Test.set_captor(this);		
	}

	run(...args){
		this._before();
		if (this.fn){
			this.fn.call(this.ctx || this, this.ctx || this, ...args);
		} else {
			for (const name in this.tests){
				this.tests[name].run(...args);
			}
		}
		this._after();
	}

	_after(){
		Test.restore_captor();
		console.groupEnd();
	}

	assert(value){
		if (value){
			this.pass++;
		} else {
			console.error("Assertion failed");
			this.fail++;
		}
	}

	add(tests){
		var test;

		if (this.fn) throw "only .fn or .tests, not both";

		for (const name in tests){
			if (this[name])
				throw "restricted namespace " + name;

			const value = tests[name];

			if (is.fn(value)){
				test = new Test({name, fn: value, ctx: this});
				this[name] = value;
			} else if (value instanceof Test) {
				test = value;
				if (!test.name) test.name = name;
				this[name] = test;
			} else {
				console.warn("oops");
			}

			this.tests[name] = test;
		}

		return this;
	}

	shouldRun(){
		return !window.location.hash || this.match();
	}

	match(){
		return decodeURI(window.location.hash.substring(1)) === this.name;
	}

	addClass(){
		this.current.addClass(...args);
	}
}

export function test(name, value){
	return new Test(name, value).render();
}

export function assert(value){
	if (Test.captor) Test.captor.assert(value);
	else console.error("whoops");
}

Object.assign(Test, {
	View: TestView,
	Pager: TestPager,
	previous_captors: [],
	set_captor(view){
		this.previous_captors.push(this.captor);
		this.captor = view;
	},
	restore_captor(){
		this.captor = this.previous_captors.pop();
	},
	controls(){
		var controls = View().addClass("test-controls").append({
			reset: View({tag:"button"}, "reset").click(function(){
				Test.reset();
			})
		});
		document.body.appendChild(controls.el);
	},
	reset(){
		window.location.href = window.location.href.split('#')[0];
	}
});

mixin(Test, assign);