import "/simple/dev/dev.js";
import "/simple/css/css.js";
import mixin from "../mixin.js";
import { is } from "/simple/util.js";
import View, { el, div } from "../View/View.js";

View.stylesheet("/simple/Test/Test.css");

export default class Test {
	constructor(...args){
		if (is.str(args[0])){
			this.name = args[0];
			this.fn = args[1];
		} else {
			// this.trace = stacktrace()[2];
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
		this.view = div().addClass('test ' + this.name).append({
			bar: div({
				label: div(this.label()).click(this.activate.bind(this))
			}),
			content: div(),
			footer: div()
		});

		this.view.content.append(this.run.bind(this));

		this.view.addClass("active");

		if (this.pass > 0)
			this.view.footer.append("Passed " + this.pass);
		if (this.fail > 0)
			this.view.footer.append("Failed " + this.fail);

		if (!this.view.parent)
			this.view.appendTo(this.container);

		return this.view;
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

	add(...args){
		if (is.str(args[0])){
			this.tests[args[0]] = args[1];
		} else {
			for (const name in args[0]){
				this.tests[name] = args[0][name];
			}
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
		this.current.addClass(...arguments);
	}

	assign(){
		return Object.assign(this, ...arguments);
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
	previous_captors: [],
	set_captor: function(view){
		this.previous_captors.push(this.captor);
		this.captor = view;
	},
	restore_captor: function(){
		this.captor = this.previous_captors.pop();
	},
	controls: function(){
		var controls = View().addClass("test-controls").append({
			reset: View({tag:"button"}, "reset").click(function(){
				Test.reset();
			})
		});
		document.body.appendChild(controls.el);
	},
	reset: function(){
		window.location.href = window.location.href.split('#')[0];
	}
});

mixin(Test, mixin.assign);