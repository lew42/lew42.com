import View, { el, div } from "../View.js";
import Test, { test, assert } from "../../Test/Test.js";
import Pager from "./Pager.js";

// test("pager", t => {
	window.pager = new Pager();
	pager.add({
		one: "one's content",
		two: "two's content"
	});
// });

pager.appendTo(document.body);

const page = pager.add.bind(pager);

page({
	three: 3,
	four(){
		el("input").attr("type", "number");
	}
})