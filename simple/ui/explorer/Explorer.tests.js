import Explorer from "./Explorer.js";
import Test, { test, assert } from "/simple/Test/Test2.js";
import simple, {el, div} from "/simple/simple.js";

Explorer.tests = new Test({}).add({
	first(){
		new Explorer()
			.add_value("test_item1", div("test_item1 content"))
			.add_value("test_item2", div("test_item2 content"))
			.add_value("test_item3", div("test_item3 content"))
			.add_value("test_item4", div("test_item4 content"));
	}
});