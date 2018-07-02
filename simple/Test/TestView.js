import View, { el, div } from "/simple/View/View.js";
import Pager from "/simple/View/Pager/Pager.js";

export default class TestView extends View {
	content(){
		this.addClass(this.test.name);
		this.test._before();
		const ctx = this.test.ctx || this.test;
		this.test.fn.call(ctx, ctx);
		this.test._after();
	}
}

// TestPager.Page = class TestPage extends Pager.Page {

// }

// export default class TestView extends View {
// 	render(){
// 		this.addClass(this.test.name);
// 		// this.append(this.test.run.bind(this.test));
// 		this.append({
// 			label: div(this.test.label()).click(this.test.activate.bind(this.test)),
// 			content: div()
// 		});

// 		this.content.append(() => {
// 			if (this.test.preview){
// 				console.group(this.test.label());

// 				this.test.preview();

// 				console.groupEnd();
// 			} else {
// 				this.test.maybe_run();
// 			}
// 		});
// 	}

// 	exec(){
// 		const test = this.test;


// 	}
// }