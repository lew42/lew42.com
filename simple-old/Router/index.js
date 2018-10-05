import Router from "./Router.js";
import View, {el, div, p, h3 } from "/simple/View/View.js";
import { icon } from "/simple/View/Icon/Icon.js";
import "/simple/Test/Test.js";

import controls from "/simple/dev/controls.js";

import "./test1.js";

// const router = new Routerx();

// ["one", "two", "three"].forEach(v => {
// 	router.add_route(v, div(v).click(d => d.activate()) );

// 	for (var n = 0; n < 5; n++){
// 		router.routes[v].add_route(v + n, div(v + n).click(d => d.activate()));
// 	}
// });

// router.routes.two.add_route("two_sub", div("two sub").click(d => d.activate()));

// console.log(router);
View.stylesheet("/simple/Router/router.css");


class Explorer extends Router {
	initialize_router(){
		this.render_router();
		super.initialize_router();
	}

	render_router(){
		this.view = div(".explorer", 
			this.tabs = div(".tabs.sep-all-c",
				this.tab = icon("home").addClass("tab").click(() => this.activate())
			),
			this.pages = div(".pages",
				this.page = div(".page.router-page")
			)
		);

		this.views = [this.tab, this.page];
	}

	make(n){
		if (n < 1) return this;
		for (let i = 1; i < n+1; i++){
			const name = (this.name || "item") + "_" +i;

			const tab = div(".tab", name).appendTo(this.router.tabs).click(() => route.activate());
			const link = div(".link.sep-all", name).appendTo(this.page).click(() => route.activate());
			
			const route = this.add(name, function(){
				if (!this.rendered){
					this.page = div(".page", el("h3", this.name)).appendTo(this.router.pages);
					this.tab = tab;
					
					this.classify(this.tab, this.page);
					
					if (n < 2 || Math.random() > 0.8){
						this.page.filler("1-6p");
					} else {
						this.make(n/1.5);
					}

					this.rendered = true;
				}
			});
		}

		return this;
	}
}
window.router = new Explorer().make(9);

View.dev.append(() => {
	div(".controls.flex.mr50-c", 
		controls.toggle(router.view, "split"),
		controls.toggle(router.view, "tab-like")
	);
});

class Custom extends Router {
	initialize_router(){
		this.view = div(".custom.explorer", 
			this.tabs = div(".tabs.sep-all-c",
				this.tab = icon("circle").addClass("tab").click(() => this.activate())
			),
			this.pages = div(".pages", 
				this.page = div(".page.router-page")
			)
		);
		this.views = [this.tab, this.page];
		super.initialize_router();
	}

	initialize(){
		this.prerender();
		this.match();
	}

	preview(){
		this.link = div(".link.sep-all", this.name).click(() => this.activate());
	}

	prerender(){
		this.tab = div(".tab", this.name).appendTo(this.router.tabs).click(() => this.activate());
		this.preview = div(".preview", this.preview.bind(this)).appendTo(this.parent.page);
	}

	content(){
		div("content for " + this.name);
	}

	_activate2(){
		this.activate_route();

		if (!this.page){
				// 1					// 2
			this.page = div(".page").appendTo(this.router.pages); // this reference needs to be in place before child routes can be added
			
			// 3
			this.classify(this.tab, this.preview, this.page);
			
			// 4
			this.page.append(this.content.bind(this));
		} else {
			this.classify();
		}

		this.emit("activate", this);
	}

	_activate(){
		this.render_page();
		super._activate();
	}

	render_page(){
		if (!this.page){
				// 1					// 2
			this.page = div(".page").appendTo(this.router.pages); // this reference needs to be in place before child routes can be added
			
			// 3
			this.views = [this.tab, this.preview, this.page];
			
			// 4
			this.page.append(this.content.bind(this));
		}
	}

	make(n){

	}

	// add(name, on, off){
	// 	this.router.tabs = div(".tab", name).appendTo()
	// 	const route = this.router.add(name, on, off);
	// 	route.tab = div(".tab", name).appendTo(this.)
	// }
}

window.custom = new Custom();

custom.page.append(p("Toggle split.").click(() => custom.view.toggleClass("split")))

custom.add("test1", {
	preview(){
		div(icon("beer"), "this is just a preview for test1").click(() => this.activate());
	},
	content(){
		h3("hello, this is test1.content");

		for (let i = 0; i < 5; i++){
			this.add("sub" + i, { content() {
				h3("this is sub" + i);
				p().filler("2-4s");
			}});
		}

		this.add("yahoo", {
			preview(){
				p("This could be any arbitrary content.  And if I want to deep link, just ", 
					el("span.link", "click here").click(() => this.activate()), 
					" for more.");
			},
			content(){
				p().filler("2-4s");
			}
		});
	}
});
custom.add("test2", {
	preview(){
		div(icon("beer"), "this is just a preview for test2").click(() => this.activate());
	},
	content(){
		h3("hello, this is test2 content");
	}
});

custom.add("test3", {
	content(){
		h3("this is test3 content");

		const exp = new Explorer();
		exp.make(9);
		exp.view.addClass("split");
	}
});

class Explorer2 extends View {

}

function render_explorer2(){
	var tabs, tab, pages, page;
	const exp2 = div(".explorer.explorer2", 
		tabs = div(".tabs.sep-all-c",
			tab = icon("circle").addClass("tab").click(() => exp2.activate())
		),
		pages = div(".pages", 
			page = div(".page.router-page")
		)
	);

	const router = new Router({
		initialize(){
			this.views = [tab, page];
			Router.prototype.initialize_router.call(this);
		}
	});
}