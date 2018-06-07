import View from "./View.js";
import Test from "../Test.js";

const test = Test.test;
const assert = Test.assert;

const div = View.div;
const el = View.el;

test("hello", () => {
	assert(true);

	div("hello world");
	div(".hello", "world");
	div(".hello");
	div(".hello.world");
	div(".hello.world", "hello", "world");
	div(".hello.world", "hello world");
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
})