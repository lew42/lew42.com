import dev from "/simple/dev/dev.js";
import is from "/simple/is/is.js";
import _Router from "/simple/Router/Router.js";
import View, {el, div} from "/simple/View/View.js";

/*
Route:Page must stay 1:1
*/

class Router extends _Router {
	nohash(){
		console.log("no hash..");
	}
}

View.stylesheet("/simple/Page/Pager.css");

export default class Page {
	constructor(){
		this.assign(...arguments);
		this.initialize();
	}

	initialize(){
		this.views = [];

		if (!this.parent){
			this.initialize_pager();
		} else {
			this.initialize_page();
		}
	}

	initialize_pager(){
		this.pager = this;
		this.prerender_pager();
		this.route = new Router({
			name: this.name,
			activated: () => this.activated(),
			deactivated: () => this.deactivated()
		});
	}

	initialize_page(){
		this.prerender_page();
		this.route = this.parent.route.add(this.name, {
			activated: () => this.activated(),
			deactivated: () => this.deactivated(),
			auto_init: false
		});

		this.route.initialize();
	}

	prerender_pager(){
		this.view = div().addClass("pager").append({
			preview: this.preview.bind(this),
			pages: div()
		});

		// to maintain a consistent api between pager & page, 
		this.preview = this.view.preview;

		this.views.push(this.preview);

		// skips the on-demand .render() that the page's rely on
		this.rendered = true;
	}

	prerender_page(){
		this.preview = div().addClass("page preview")
			.append(this.preview.bind(this))
			.appendTo(this.parent.preview.routes);
		this.views.push(this.preview);
	}

	
	// With this pattern, we ALWAYS have to pass a function to preview.
	preview(preview){
		return {
			name: div(this.name).click(() => this.route.activate()),
			routes: div()
		};
	}


	activated(){
		if (!this.rendered){
			this.render();
			this.rendered = true;
		} else {
			this.classify();
		}
	}

	deactivated(){
		console.log("declassify", this.name);
		this.classify(false);
	}

	render(){
		this.view = div().addClass("page"); // 1
		this.views.push(this.view); // 2
		this.classify(); // 3
		this.view.append(this.content.bind(this)).appendTo(this.pager.view.pages); // 4
	}

	btn(){
		const btn = div(this.name).click(() => this.route.activate());
		this.views.push(btn);
		return btn;
	}

	add(name, content){
		if (is.pojo(name)){
			for (const n in name){
				this.add_page(n, { content: name[n] });
			}
		} else {
			this.add_page(name, { content } );
		}
	}

	add_page(name, props){
		const page = new this.constructor({
			name, parent: this, pager: this.pager
		}, props);
	}

	classify(add = true){
		for (const view of this.views){
			view[add ? "addClass" : "removeClass"]("active active-page");
		}

		var parent = this.parent;

		if (parent)
			parent.classify_as_active_parent(add);

		while (parent){
			parent.classify_as_active_ancestor(add);
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

	assign(){
		return Object.assign(this, ...arguments);
	}
}