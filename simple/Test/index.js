import Test, { test, assert } from "./Test2.js";
import { div } from "/simple/View/View.js";

import some from "./some.test.js";
import single from "./single.test.js";

import breadcrumbs from "/simple/breadcrumbs.js";

breadcrumbs();

test("hello", t => {
	div("world");
});

const test1 = new Test({
	// name: "test1",
	test1(){
		div("hello world");
		console.log("test1");
	},
	alpha(){
		console.log("alpha");
	}
}).add({
	some, single, // already Test instances
	one(){ // upgraded to Test instances, and added as naked fn to this
		this.test1();
		this.alpha();
	},
	nested(){
		this.some.fixture1();
	}
});

test1.render().appendTo(document.body);

// console.log(test1);