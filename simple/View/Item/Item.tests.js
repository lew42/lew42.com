import View, { el, div } from "../View.js";
import Test, { test, assert } from "../../Test/Test.js";
import { item } from "./Item.js";

import importedItem from "./item-import-test.js";

test("item", t => {
	console.log(item("hello world").name);
	item(); // empty
});

test("montserrat", t=> {
	// t.view.addClass("ff-montserrat");
	item("plain");
	item(".ff-montserrat").addClass("ff-montserrat");
	item(".fs-75").addClass("fs-75");
	item(".fs-75.ff-montserrat").addClass("fs-75 ff-montserrat");
});

test("dark", t => {
	t.view.addClass("dark ff-montserrat");
	item("hello world");
});

test("import", t => {
	t.view.content.append(importedItem);
});

test("columnar", t => {
	div(".two.cols.style-85", {
		left(){
			item("left side");
		},

		right(){
			this.css("background", "red");
			this.append("needs content");
		}
	})
});