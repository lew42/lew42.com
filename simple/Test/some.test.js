import Test from "./Test2.js";

export default new Test({
	fixture1(){
		return "fixture1 value";
	}
}).add({
	test1(){
		console.log(this.fixture1());
	}
});