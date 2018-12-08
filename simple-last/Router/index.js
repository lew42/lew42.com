import simple, { el, div, p } from "/simple/simple.js";
import _Router from "./Router.js";

class Router extends _Router {
	hash_no_match(){
		console.group(this.name, "hash_no_match");
		this.no_match();
		console.groupEnd();
	}

	hash_match(){
		console.group(this.name, "hash_match");
		this.activate(false);
		console.groupEnd();
	}

	no_hash(){
		console.group(this.name, "no_hash");
		this.no_match();
		console.groupEnd();
	}

	no_match(){
		console.log(this.name, "no_match");
	}

	activated(){
		// this.render();
	}
}

function router1(){
	const router = window.router = new Router();

	router.add("test1", {
		activated(){
			console.log(this.name, "activated");
		}
	});
}

div("router1()").click(router1);

// router1();

class Pager extends Router {
	initialize(){
		console.log(this.name, "initialize");
		this.render();
	}

	render(){
		div(this.name).click(() => this.activate());
	}
}

function pager1(){
	const pager = window.pager = new Pager();

	pager.add("test1");
}

// pager1();
;

const views = [];

views.push(div("pager1()").click(pager1));

views.hide = function(){
	// for (const view of this){
	// 	view.hide();
	// }
	this.forEach(view => view.hide());
	return this;
};

views.hide();

// class Switcher {
// 	constructor(){
// 		this._views = [];
// 	}

// 	add(pojo){
// 		for (const prop in pojo){
// 			this._views.push(pojo[prop]);
// 			this[prop] = pojo[prop];
// 		}
// 	}
// }

// var type;
// div(type = typeof {});
// if (){
// 	div("true");
// } else {
// 	div("false");
// }
/*

// 1
div(() => {
	// 2

	// use the 1, 2 annotation to inndicate synchronous code.  There are things you can do with a guarantee of synchronous execution that you can't do without.
});

*/