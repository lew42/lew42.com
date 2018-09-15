import Router from "./Router.js";
import View, {el, div, p, h3 } from "/simple/View/View.js";
import { icon } from "/simple/View/Icon/Icon.js";

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