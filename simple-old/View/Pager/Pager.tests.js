import View, { el, div } from "../View.js";
import Test, { test, assert } from "../../Test/Test.js";
import Pager from "./Pager.js";

Pager.tests = {
	simple(){
		return new Pager().add({
			tab_name1: "string content",
			tab_name2(){ return {
				ret: "returned",
				content: "content"
			}},
			tab_name_3: div(".shit", "I think I overlooked a big problem"),
			only_prop_name: {
				tab: "tab content override",
				content: "page content"
			},
			tab_class_override: {
				// Tab: class Tab extends Pager.Tab { // this is silly, for 1 instance... just use the above object literal...
				// 	initialize(){
				// 		super.initialize();
				// 	}
				// }
			},
			one: div().filler("1-2s"),
			two: div().filler("3-5s"),
			three: div().filler("3-5p")
		})
	}
};

Pager.test = function(Pager){

};

Pager.demo = function(){
	return div(".demo.grid.two.pad1-c", {
		light(){
			this.addClass("stack1-c");
			const pager1 = Pager.tests.simple().addClass("v1");
			pager1.tabs.addClass("sep-all-c")
			// Pager.tests.simple().addClass("v2");

		}, 

		dark(){
			this.addClass("stack1-c")
			Pager.tests.simple().addClass("v1");
			Pager.tests.simple().addClass("v2");
		}
	});
};

Pager.demo().appendTo(document.body);

// test("pager", t => {
	window.pager = new Pager({
		// Tab: class Tab extends Pager.Tab {
		// 	initialize(){
		// 		super.initialize();
		// 	}
		// }
	}).addClass("base");
// });

// pager.appendTo(document.body);

pager.add({
	one: 1,
	two: true,
	three: "three",
	four(page){
		console.log("yo");
		this.addClass("wrap");
		page.append("hello world");
	},
	five(){
		console.log("yo");
		this.addClass("wrap");
		div(".page.wrap").filler("2-4s");
	},
	six(){
		console.log("yo");
		el("input").attr("type", "number");
	},
	// customTab: { // this obj becomes .content
	// 	tab: el("button", "btn")
	// }
});

pager.add_page({
	name: "customTab",
	tab: el("button", "this is a custom button tab"),
	el: div(".my-special-div", "my special content").el
})

window.test_pager = new Pager();

test_pager.add({
	pager1(){
		// this.addClass("wrap");
		new Pager().add({
			one:1, two: true, three: "three"
		});
	},
	demo(){
		Pager.demo();
	}
});

// test_pager.appendTo(document.body);