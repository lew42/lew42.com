import {is} from "/simple/util.js";
import "/simple/livereload.js";

import Test from "./Test.js";
import TestsView from "./TestsView.js";

export default class Tests {
	constructor(...args){
		Object.assign(this, ...args);

		this._tests = {};
		this.View = this.View || this.constructor.View;
		this.Test = this.Test || this.constructor.Test;
	}

	add(...args){
		if (is.str(args[0])){
			this.add_test(args[0], args[1]);
		} else {
			for (const name in args[0]){
				this.add_test(name, args[0][name]);
			}
		}

		return this;
	}

	add_test(name, value){
		this._tests[name] = this.Test.use(value, { name, tests: this });
	}

	run(){
		for (const name in this.tests){
			this._tests[name].run();
		}
	}

	render(...args){
		return new this.View({
			tests: this
		}, ...args);
	}
}

Tests.View = TestsView;
Tests.Test = Test;