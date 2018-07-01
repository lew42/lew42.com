import Tests from "./Tests.js";
import View, {el, div} from "/simple/View/View.js";

export default new Tests({
	name: "Tests.tests.js",
	three(){
		console.log("three");
	}
}).add({
	one(){
		div("some test content")
		console.log("one");
	},
	two(){
		this.three();
	}
});