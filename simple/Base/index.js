import DebugBase from "./DebugBase.js";

const obj = new DebugBase({
	test(a, b){
		return a + b;
	}
});

console.log(obj.test(1, 2));