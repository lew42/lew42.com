import View from "/simple/View/View.js";
import store from "/simple/store/store.js";
import { is } from "/simple/util.js";

View.stylesheet("/simple/dev/dev.css");

const config = store("simple.dev");
config.save = function(){
	store("simple.dev", this);
};

config.set = function(n, v){
	this[n] = v;
	this.save();
};


const body = new View();
body.el = document.body;

if (!is.def(config.wires)){
	config.set("wires", body.hasClass("wires"));
} else {
	if (config.wires) body.addClass("wires");
}

window.addEventListener("keydown", e => {
	// console.log(e);
	if ((e.key === "d") && e.ctrlKey){
		e.preventDefault();
		body.toggleClass("wires");
		config.set("wires", body.hasClass("wires"));
	}
});