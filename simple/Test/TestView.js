import View, { el, div } from "/simple/View/View.js";

export default class TestView extends View {
	render(){
		this.addClass(this.test.name);
		// this.append(this.test.run.bind(this.test));
		this.append({
			label: div(this.test.name).click(this.test.activate.bind(this)),
			content: div()
		});

		this.content.append(() => {
			this.test.run();
		});
	}

	exec(){
		const test = this.test;


	}
}