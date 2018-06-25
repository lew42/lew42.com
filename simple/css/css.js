import View from "/simple/View/View.js";

View.stylesheet("/simple/css/base.css");

const body = new View();
body.el = document.body;
window.addEventListener("keydown", e => {
	console.log(e);
	if ((e.key === "d") && e.ctrlKey){
		e.preventDefault();
		body.toggleClass("wires");
	}
});