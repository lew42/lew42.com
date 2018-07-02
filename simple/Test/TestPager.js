import View, { el, div } from "/simple/View/View.js";
import Pager from "/simple/View/Pager/Pager.js";

View.stylesheet("/simple/Test/TestPager.css");

export default class TestPager extends Pager {
	initialize(){
		this.addClass(this.test.name, "v1");
		this.render_test();
	}

	render_test(){
		this.test._before();

		for (const name in this.test.tests){
			const pages = {};
			pages[name] = this.test.tests[name].render.bind(this.test.tests[name]);
			this.add(pages);
		}
		
		this.test._after();
	}
}