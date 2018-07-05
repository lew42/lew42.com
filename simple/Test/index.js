import Test, { test, assert } from "./Test2.js";
import View, { el, div, p } from "/simple/View/View.js";

import some from "./some.test.js";
import single from "./single.test.js";

import breadcrumbs from "/simple/breadcrumbs.js";

View.stylesheet("/simple/css/omfg.css");

import Icon, { icon } from "/simple/View/Icon/Icon.js";

View.app.addClass("well1");

const d = div();
d.on("something", (d, e) => {
	console.log(e.detail.prop);
});

d.emit("something", { prop: "hello log"} );

div(".section1.pp2.well1",
	div(".content-squeeze", 
		p().filler("3-5s"),
		p().filler("3-5s"),
		div(".item1", ".item1"),
	),
	div(".item1.content-squeeze", ".item1.content-squeeze"),
	div(".item1.content-squeeze.pad0.pp.pp1", 
		p().filler("2-3s"),
		div(".full.full2").filler("2s"),
		p().filler("2-3s")
	),
);

div(".section2.pp1", 
	div(".item1.full", ".item1.full"),
	div(".item1", ".item1"),
	div(".item1", ".item1"),
	div(".item1.full", ".item1.full"),
	div(".item1.full", ".item1.full"),
	div(".item1", ".item1"),
	div(".item1", ".item1"),
	div(".item1.full", ".item1.full"),
);

div(".section1.pp1.well1", 
	div(".item1", ".item1"),
	div(".item1.item1-2", icon("beer"), div("", ".item1-2")),
	div(".full.full1", ".full1"),
	p().filler("3-5s"),
	p().filler("3-5s"),
);

// breadcrumbs();

// test("hello", t => {
// 	div("world");
// });

// const test1 = new Test({
// 	// name: "test1",
// 	test1(){
// 		div("hello world");
// 		console.log("test1");
// 	},
// 	alpha(){
// 		console.log("alpha");
// 	}
// }).add({
// 	// some, single, // already Test instances
// 	// one(){ // upgraded to Test instances, and added as naked fn to this
// 	// 	this.test1();
// 	// 	this.alpha();
// 	// },
// 	// nested(){
// 	// 	this.some.fixture1();
// 	// }
// 	t1(){ div(".t1", "this is a .t1") }
// });

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
// test1.render();

// console.log(test1);