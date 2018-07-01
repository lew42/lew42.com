import "../livereload.js";
import "/simple/dev/dev.js";
import "/simple/css/css.js";
import mixin from "../mixin.js";
import { is } from "/simple/util.js";
import View, { el, div } from "../View/View.js";

import stacktrace from "./stacktrace.js";

import TestView from "./TestView.js";

View.stylesheet("/simple/Test/Test.css");

export default class Test {
	constructor(...args){
		if (is.str(args[0])){
			this.name = args[0];
			this.fn = args[1];
		} else {
			this.assign(...args);
		}

		if (!this.name) console.log(stacktrace());

		this.tests = {};
		this.pass = 0;
		this.fail = 0;

		this.container = this.container || document.body;

		// if (this.shouldRun())
		// 	this.render();
	}

	render(){
		return new this.constructor.View({
			test: this
		});
	}

	render2(){
		this.view = div().addClass('test ' + this.name).append({
			bar: div({
				label: div(this.label()).click(this.activate.bind(this))
			}),
			content: div(),
			footer: div()
		});

		this.view.content.append(this._render.bind(this));

		this.view.addClass("active");

		if (this.pass > 0)
			this.view.footer.append("Passed " + this.pass);
		if (this.fail > 0)
			this.view.footer.append("Failed " + this.fail);

		if (!this.view.parent)
			this.view.appendTo(this.container);

		return this.view;
	}

	_render(){
		if (this.fn){
			return new this.TestFnView;
		}
	}

	render_self(){
		if (this.fn){
			return new TestFnView({})
		} else {
			this.render_tests();
		}
	}

	render_tests(){
		// loop through
	}

	activate(){
		window.location.hash = this.name;
		window.location.reload();
	}

	label(){
		return (this.match() ? "#" : "") + this.name;
	}

	run(...args){
		console.group(this.name);
		Test.set_captor(this);

		if (this.fn){
			this.fn.call(this.ctx || this, this.ctx || this, ...args);
		} else {
			for (const name in this.tests){
				this.tests[name].run(...args);
			}
		}

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
	return new Test(name, value).render().appendTo(document.body);
}

export function assert(value){
	if (Test.captor) Test.captor.assert(value);
	else console.error("whoops");
}

Object.assign(Test, {
	View: TestView,
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

mixin(Test, mixin.assign);