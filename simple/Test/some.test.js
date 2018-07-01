import Test, { test, assert } from "./Test2.js";
import View, {el, div} from "/simple/View/View.js";
export default new Test({
	fixture1(){
		return "fixture1 value";
	},
}).add({
	preview(){
		div("this is a preview!");
	},
	test1(){
		div("inside test1()")
		console.log(this.fixture1());
	},
	test2(){
		assert(false);
	}
});