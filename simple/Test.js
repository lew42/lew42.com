import "./livereload.js";
import mixin from "./mixin.js";
import View from "./View/View.js";

const div = View.div;

export default class Test {
	constructor(...args){
		this.pass = 0;
		this.fail = 0;

		this.assign(...args);

		this.container = this.container || document.body;

		if (this.shouldRun())
			this.render();
	}

	render(){
		this.view = div().addClass('test').append({
			bar: div(this.label()).click(this.activate.bind(this)),
			content: div(),
			footer: div()
		});

		this.view.content.append(this.exec.bind(this));

		this.view.addClass("active");

		if (this.pass > 0)
			this.view.footer.append("Passed " + this.pass);
		if (this.fail > 0)
			this.view.footer.append("Failed " + this.fail);

		if (!this.view.parent)
			this.view.appendTo(this.container);
	}

	activate(){
		window.location.hash = this.name;
		window.location.reload();
	}

	label(){
		return (this.match() ? "#" : "") + this.name;
	}

	exec(){
		console.group(this.label());
		
		Test.set_captor(this);

			// run the test
			this.fn();

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

	shouldRun(){
		return !window.location.hash || this.match();
	}

	match(){
		return window.location.hash.substring(1) === this.name;
	}

	static get test(){
		const self = this;
		return function(name, fn){
			return new self({
				name: name,
				fn: fn
			})
		}
	}
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
	assert: function(value){
		if (Test.captor)
			Test.captor.assert(value);
		else
			console.error("whoops");
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