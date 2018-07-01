import View, {el, div} from "/simple/View/View.js";

export default class TestView extends View {
	content(){
		el("h3", this.test.name);
		this.test.run();
	}
}