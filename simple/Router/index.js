import Router from "./Router.js";
import View, {el, div, p, h3 } from "/simple/View/View.js";
import { icon } from "/simple/View/Icon/Icon.js";
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

el("style",
	".explorer { font-family: Tahoma; margin: 2em auto 3em; max-width: 40em; border-radius: 3px; margin-left: auto; margin-right: auto; }",
	".explorer > .pages { padding: 0.5em 0.75em; background: #f0f0f0; border-radius: 3px; overflow: hidden; box-shadow: 1px 1px 1px rgba(0,0,0,0.1); }",
	".explorer > .pages > * { padding: 0.5em; box-sizing: border-box; }",
	".explorer.tab-like > .pages > .active-parent { min-width: 30%; padding: 0; }",
	".explorer.tab-like > .pages {}",
	".tabs > .active { background: #eee }",
	".tabs > .active-route { background: #e05300; color: #eee; }",
	".tabs > .active-parent { background: #ccc; }",
	".tabs > :not(.active):not(.active-ancestor) { display: none;}",
	".tabs { box-shadow: 1px 1px 1px rgba(0,0,0,0.1); display: flex; flex-wrap: wrap; background: #f0f0f0; margin-bottom: 8px; border-radius: 3px; overflow: hidden; }",
	".tabs > * { cursor: pointer; padding: 0.25em 0.5em; }",
	".explorer:not(.split) > .pages > :not(.active-route) { display: none; }", 
	".explorer.split > .pages > :not(.active-route):not(.active-parent) { display: none; }",
	".explorer.split > .pages { display: flex; }",
	".explorer.split > .pages > * { min-width: 50%; }",
	".pages > * > .link { padding: 0.5em 0.75em; cursor: pointer; background: #fff; }",
	"span.link { background: #555; color: white; cursor: pointer; padding: 0.1em 0.3em; border-radius: 3px; }");


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

div(".flex.mr50-c", 
	div("split").click(() => router.view.toggleClass("split")),
	div("tab-like").click(() => router.view.toggleClass("tab-like"))
);
window.router = new Explorer().make(9);

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

	_activate(){
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