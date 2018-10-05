import simple, { View, el, div, p, h1, h2, h3, icon, test, assert, write } from "/simple/simple.js";

import Pager from "/simple/View/Pager2/Pager.js";
import Router from "/simple/Router/Router.js";

View.stylesheet("/simple/ui/explorer/explorer.css");

export default class Explorer extends View {
	initialize(){
		this.items = {};

		this.router = new Router({
			on: () => this.page.addClass("active"),
			off: () => this.page.removeClass("active")
		});

		if (this.view)
			this.append(this.view);

		if (!this.root)
			this.root = this;
	}

	content(){
		this.append({
			breadcrumbs: div(".sep-all-c"),
			container: div()
		});

		this.bc = icon("circle").addClass("active sep-all").appendTo(this.breadcrumbs).click(() => {
			this.router.activate();
		});

		this.page = div(".root.active.list.sep-all-c").appendTo(this.container);
	}

	add(items){
		for (const name in items)
			this.add_value(name, items[name]);

		return this;
	}

	add_value(name, value){
		if (value instanceof View){
			const bc = div(name).appendTo(this.breadcrumbs);
			const list = div(name).appendTo(this.page);

			const route = this.router.add(name, {
				on(){
					value.addClass("active");
					bc.addClass("active");
					list.addClass("active");

					var parent = route.parent;
					while (parent){
						parent.active_path();
					}
				},
				off(){
					value.removeClass("active");
					bc.removeClass("active");
					list.removeClass("active");
				},
				active_path(){
					value.addClass("active-path");
					bc.addClass("active-path");
					list.addClass("activeZ");
				}
			});

			bc.click(d => route.activate());
			list.click(d => route.activate());

			this.container.append(value);
		}

		return this;
	}
}