import View, { el, div, p } from "./View.js";
import Test, { test, assert } from "../Test/Test.js";

test("piggy back", t => {
	const existingEl = document.createElement("svg");

	const view = new View({
		el: existingEl
	});

	// or

	const view2 = new View({
		el: new View().el
	}).append("view2");

	// this might be useful for creating Views in a modular way...

	class Awesomeness extends View {
		initialize(view){
			this.el = view.el;

			this.click(() => {
				this.countdown(prompt("count", 10), prompt("time", 100));
			});
		}

		countdown(i = 5, t = 500){
			this.text(i--)
			const interval_id = setInterval(() => {
				this.text(i--);
				if (i === 0){
					clearInterval(interval_id);
					setTimeout(() => this.text("BOOM"), t)
				}
			}, t);

		}
	}

	new Awesomeness(view2);
});

test("p", t => {
	p("this is a paragraph");
	p(".test-class", "this is a paragraph with .test-class");
});

test("extend", t => {
	class View2 extends View {

		content(){ return {
			a: "a",
			b(){
				this.append("b");
			},
			c: el("button", "c"),
			thing: this.thing,
		}}

		thing(){ return {
			another: "another",
			nested: "nested",
			thing: "thing"
		}}
	}

	new View2();
});

test("objects", t => {
	div(".one.two", {
		one: "string",
		two: div(".extra.classes", div("several"), div("children")),
		three(){
			this.addClass("yerp");
			div("one");
			div("two");
			div("three");
		}
	});
});

test("hello", () => {
	assert(true);

	div("hello world");
	div(".hello", "world");
	div(".hello");
	div(".hello.world");
	div(".hello.world", "hello", "world");
	div(".hello.world", "hello world");
	div("bloodmoss", "ginseng", "spider's silk", "mandrake root", "black pearl", "nightshade", "garlic", "sulfurous ash")
	div(".one.two", {
		three: "four",
		five: div(".six", "seven")
	});

	div(d => {
		d.addClass("test");
		div("nested?");
	})

	el("span.one", "two");
	el("input.cls").attr("type", "email");

	new View({
		tag: "section",
		classes: "one two three"
	})

	test("nested tests?", t => {
		t.assert("yo");
	});
});