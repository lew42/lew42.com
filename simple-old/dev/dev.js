import "./livereload.js";
import View, { el, div } from "/simple/View/View.js";
import store from "/simple/store/store.js";
import { is } from "/simple/util.js";
import breadcrumbs from "/simple/breadcrumbs.js";

View.stylesheet("/simple/dev/dev.css");

const config = store("simple.dev");
config.save = function(){
	store("simple.dev", this);
};

config.set = function(n, v){
	this[n] = v;
	this.save();
};

View.dev = div(".dev", dev => {
	breadcrumbs();
})

document.ready.then(() => {
	View.dev.appendTo(document.body);
});


if (!is.def(config.wires)){
	config.set("wires", View.body.hasClass("wires"));
} else {
	if (config.wires) View.body.addClass("wires");
}

if (!is.def(config.dev)){
	config.set("dev", View.dev.hasClass("active"));
} else {
	if (config.dev){
		View.dev.addClass("active");
		View.app.addClass("has-dev-drawer");
	} 
}

window.addEventListener("keydown", e => {
	// console.log(e);
	if ((e.key === "d") && e.ctrlKey){
		e.preventDefault();
		View.body.toggleClass("wires");
		config.set("wires", View.body.hasClass("wires"));
	} if ((e.key === "p") && e.ctrlKey){
		e.preventDefault();
		View.dev.toggleClass("active");
		View.app.toggleClass("has-dev-drawer");
		config.set("dev", View.dev.hasClass("active"));
	}
});