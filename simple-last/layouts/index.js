import Page from "/simple/Page/Page.js";
import View, {el, div} from "/simple/View/View.js";

View.stylesheet("/simple/layouts/layouts.css");

const page = new Page({
	name: "Layouts"
});

function bg1(){
	return div(...arguments).addClass("bg1");
}

function cls(classes, ...args){
	return div(...args).addClass(classes);
}

function p(){
	return el("p", ...arguments);
}

function intro(){
	return el("p", ...arguments).addClass("intro");
}

function paper(){
	return div(...arguments).addClass("paper");
}

// or, p.intro("content"); ?

page.add({
///

post1(post, view){
	post.props;
	view.addClass("bg-ddd pad-l");
	
	paper(
		el("h1", "This is an H1 Header Tag."),
		p().filler("2-4s")
	);
	paper().filler("2-4p");
	paper().filler("2-4p");
	paper().filler("2-4p");
},

post2(){

}

///
});