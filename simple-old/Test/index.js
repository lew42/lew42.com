import Test, { test, assert } from "./Test2.js";
import View, { el, div, p } from "/simple/View/View.js";

import some from "./some.test.js";
import single from "./single.test.js";
import full_content from "./full-content.js";

import breadcrumbs from "/simple/breadcrumbs.js";

View.stylesheet("/simple/css/omfg.css");

import Icon, { icon } from "/simple/View/Icon/Icon.js";

View.app.addClass("well1");



// breadcrumbs();

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
	full_content,
	// one(){ // upgraded to Test instances, and added as naked fn to this
	// 	this.test1();
	// 	this.alpha();
	// },
	// nested(){
	// 	this.some.fixture1();
	// }
	hello(){
		div("world");
	},
	t1(){ div(".t1", "this is a .t1") },
	t2(){
		const d = div();
		d.on("something", (d, e) => {
			console.log(e.detail.prop);
		});

		d.emit("something", { prop: "hello log"} );
	}
});

test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();
// test1.render();

// console.log(test1);