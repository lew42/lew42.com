import TestView from "./TestView.js";
import { is } from "/simple/util.js";

export default class Test {
	constructor(...args){
		Object.assign(this, ...args);

		this.View = this.View || this.constructor.View;
	}

	run(...args){
		console.group(this.name);
		if (is.fn(this._test)){
			this._test.call(this.tests, this.tests, ...args);
		} else if (this._test.run){
			this._test.run(...args);
		}
		console.groupEnd();
	}

	render(){
		return new this.View({ test: this });
	}
	
	static use(value, ...args){
		if (is.pojo(value)){
			return new this(value, ...args);
		} else {
			return new this({ _test: value }, ...args);
		}
	}
}

Test.View = TestView;