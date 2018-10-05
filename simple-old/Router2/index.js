import Router from "./Router.js";
import View, {el, div, p, h3 } from "/simple/View/View.js";
import { icon } from "/simple/View/Icon/Icon.js";

View.stylesheet("/simple/Router2/styles.css");

class Page {
	constructor(){
		Object.assign(this, ...arguments);
		this.initialize();
	}

	render(){
		this.view = this.container = div(".page").appendTo(this.explorer.pages);
		this.tab = div(".tab", this.route.name).appendTo(this.explorer.tabs).click(() => this.route.activate());
		this.preview = div(".preview", this.preview.bind(this)).appendTo(this.parent.container);
		this.views = [this.view, this.tab, this.preview];
	}

	preview(){
		div(this.name).click(() => this.route.activate());
	}

	get name(){
		return this.route.path();
	}

	get parent(){
		return this.route.parent.page;
	}

	initialize(){
		this.render();
	}

	classify(add = true){
		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active active-page");
		}

		var parent = this.route && this.route.parent;

		if (parent)
			parent.page.classify_as_active_parent(add);

		while (parent){
			parent.page.classify_as_active_ancestor(add);
			parent = parent.parent;
		}
	}

	classify_as_active_parent(add = true){
		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active-parent");
		}
	}

	classify_as_active_ancestor(add = true){
		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active active-ancestor");
		}
	}

	get_Page_constructor(){
		return this.constructor;
	}

	add(name, content){
		const Page = this.get_Page_constructor();
		const route = this.route.add(name, {
			activated(){
				if (!this.page.rendered){
					this.page.view.route = this;
					this.page.view.append(content);
					this.page.rendered = true;
				}
				this.page.classify();
			},
			deactivated(){
				this.page.classify(false);
			}
		});
		const page = new Page({
			route, explorer: this.explorer,
		});

		// 1
		route.page = page;

		// 2
		route.init();

		return page;
	}

	test(n){
		for (var i = 1; i < n + 1; i++){
			this.add("test" + i, function(){
				console.log(this);
				div("this is " + this.route.path());
			}).test(n-2);
		}
	}
}

class Explorer extends Page {
	initialize(){
		this.explorer = this;

		// 1
		this.view = div(".explorer", 
			this.tabs = div(".tabs.sep-all-c",
				this.tab = icon("home").addClass("tab explorer-tab").click(() => this.router.activate())
			),
			this.pages = div(".pages", this.page = this.container = div(".page.explorer-page"))
		);

		// 2
		this.views = [this.view, this.tab, this.page];


		const exp = this;
		// 3
		this.route = this.router = new Router({
			explorer: this,
			page: this,
			activated: () => this.classify(),
			deactivated: () => this.classify(false)
			// activated(){
			// 	exp.route = this;
			// 	exp.classify();
			// },
			// deactivated(){
			// 	exp.classify(false);
			// }
		});

	}

	get_Page_constructor(){
		return this.constructor.Page;
	}
}

Explorer.Page = Page;

window.explorer = new Explorer();

// explorer.add("test1", function(){ 
// 	div("this is test1");
// });

explorer.test(8);
// window.router = new Router();
// router.make(5);

// div(".router", function(){
// 	h3("Router");
// 	div(".routes", function(){
// 		for (const name in router.routes){
// 			div(".route", name).click(() => router.routes[name].activate());
// 		}
// 	})
// });
// const exp = new Explorer();