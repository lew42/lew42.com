import View, { el, div } from "./View.js";
import Test, { test, assert } from "../Test/Test.js";

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