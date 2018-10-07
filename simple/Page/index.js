import Page from "/simple/Page/Page.js";
import View, {el, div} from "/simple/View/View.js";

const page = new Page({
	name: "root"
});

page.add("one", function(){
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

page.add("two", function(){
	div("this is page 2");
});