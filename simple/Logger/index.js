import DebugBase from "./Logger.js";
import simple, {el, div} from "/simple/simple.js";

window.DebugBase = DebugBase;

const Thing = DebugBase.Logify.classify(class Thing extends DebugBase {
	method(a, b, c){
		console.log("a", a);
		div("internal");

	}

	method2(){

	}
});
console.log(Thing.prototype.method);

window.obj = new Thing();
console.log(window.obj.method);
obj.method(1, 2, 3);