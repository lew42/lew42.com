import Routerx, { Router } from "./Router.js";
import View, {el, div, p} from "/simple/View/View.js";
import "/simple/Test/Test.js";

// const router = new Routerx();

// ["one", "two", "three"].forEach(v => {
// 	router.add_route(v, div(v).click(d => d.activate()) );

// 	for (var n = 0; n < 5; n++){
// 		router.routes[v].add_route(v + n, div(v + n).click(d => d.activate()));
// 	}
// });

// router.routes.two.add_route("two_sub", div("two sub").click(d => d.activate()));

// console.log(router);

el("style", ".pages > :not(.active) { display: none; } .tabs > .active { background: #eee } .tabs > :not(.active, .active-path){ display: none;}");
const tabs = div(".tabs");
const pages = div(".pages");

window.router = new Router();

div(".reset", "reset").appendTo(tabs).click(() => router.activate());

function make(n, router, name){

	for (let i = 1; i < (n + 1); i++){
		const _name = name + "_" + i;
		let page;
		const tab = div(".tab", _name).appendTo(tabs).click(() => route.activate());
		const route = router.add(_name, () => {
			page = (page || div(".page", "content for " + _name).appendTo(pages)).addClass("active");
			tab.addClass("active");
		}, (route, next) => {
			page.removeClass("active");
			tab.removeClass("active");
		});


		make(n-1, route, _name);
	}
}

make(3, router, "item");
/*

new Router({
	props,
	route_name: new Route(route => {
		route.name === "route_name";
		// activate cb
	}, route => {
		// deactivate cb
	})
});

new Router().add({
	route_name: new Route(route => {}, route => {}),
	route_name: [route => {
	
	}, route => {
	
	}],
	route_name: {
		sub_routes?
	},
	route_name: {
		on(){
			
		},
		off(){
			
		}
	}
})

*/

// router.add({
// 	one: {
// 		a(){
// 			div("a");
// 		},
// 		b(){
// 			div("b");
// 		},
// 		c(){
// 			div("c");
// 		},
// 		d: {
// 			d1(){
// 				div("d1");
// 			},
// 			d2(){
// 				div("d2");
// 			}
// 		}
// 	},
// 	two: {
// 		a(){
// 			div("a");
// 		},
// 		b(){
// 			div("b");
// 		},
// 		c(){
// 			div("c");
// 		},
// 		d: {
// 			d1(){
// 				div("d1");
// 			},
// 			d2(){
// 				div("d2");
// 			}
// 		}
// 	}
// });

console.log(router);