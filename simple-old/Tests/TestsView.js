import View, { el, div } from "/simple/View/View.js";

export default class TestsView extends View {
	content(){
		el("h2", this.tests.name);
		for (const name in this.tests._tests){
			const test = this.tests._tests[name];
			test.render()
		}
	}
}