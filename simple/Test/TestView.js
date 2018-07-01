import View, { el, div } from "/simple/View/View.js";

export default class TestView extends View {
	render(){
		this.addClass(this.test.name);
		// this.append(this.test.run.bind(this.test));
		this.append({
			label: div(this.test.label()).click(this.test.activate.bind(this.test)),
			content: div()
		});

		this.content.append(() => {
			if (this.test.preview){
				console.group(this.test.label());

				this.test.preview();

				console.groupEnd();
			} else {
				this.test.maybe_run();
			}
		});
	}

	exec(){
		const test = this.test;


	}
}