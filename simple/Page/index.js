import Page from "/simple/Page/Page.js";
import View, {el, div} from "/simple/View/View.js";

const page = new Page({
	name: "root"
});

page.add("one", function(){
	div("hello world");
});

page.add("two", function(){
	div("this is page 2");
});