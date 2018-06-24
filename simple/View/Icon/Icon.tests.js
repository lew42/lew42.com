import View, { el, div } from "../View.js";
import Test, { test, assert } from "../../Test/Test.js";
import { icon } from "./Icon.js";

test("icon", t => {
	icon("unknown");
	icon();
	icon("beer");
	// icon("beer").icon = "plane";
	// icon("beer").assign({ icon: "plane" })

	// icon("beer").set_icon("plane");
	// icon("beer").set_size("xs");
	// icon("beer").set_size("lg");
	// icon("beer").set_size("2x").set_size("3x");

	icon("beer").icon("plane");

	div("this is a div", icon("beer"));
	el("style", ".flex { display: flex; }");
	div(".flex", "this is a flex div", icon("beer"));

	window.box = div({
		one: icon("beer"),
		two: icon("plane"),
		// icon: icon("box"),
		_icon: icon("cubes")
	});

	box.icon = function(icon){
		return this._icon.icon(icon);
	}

	// box.icon.icon("cube");
	box.icon("cubes");

	/// or... use .set()?
	// box.set({ icon: "cubes" });

	// box.one.icon = "circle";
});

test("another test box", t => {
	icon("box")
});