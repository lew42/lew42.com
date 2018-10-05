import View, { el, div } from "../View.js";
import Test, { test, assert } from "../../Test/Test.js";
import { icon } from "./VividIcon.js";

test("icon", t => {
	icon("unknown");
	icon();
	icon("doc");
	icon("beer").icon = "plane";
	icon("beer").assign({ icon: "plane" })
	// icon("beer").set_icon("plane");
	// icon("beer").set_size("xs");
	// icon("beer").set_size("lg");
	// icon("beer").set_size("2x").set_size("3x");

	div("this is a div", icon("beer"));
	el("style", ".flex { display: flex; }");
	div(".flex", "this is a flex div", icon("beer"));

	window.box = div({
		one: icon("beer"),
		two: icon("plane")
	});

	box.one.icon = "circle";
});

test("another test box", t => {
	icon("box")
});