import Page from "/simple/Page/Page.js";
import View, {el, div} from "/simple/View/View.js";
View.set_captor(new View({ el: document.body, capturable: false }));

const pager = new Page({
	name: "Root"
});

pager.add("one", function(){
	div("one content");
	this.add({
		one_1(){
			div("one_1 content?")
		},
		one_2(){
			div("one_2 content");

			this.add({
				one_2_1(){
					div("one_2_1 content");
				}
			})
		}
	})
});

pager.add("two", function(){
	div("this is page 2?");
});