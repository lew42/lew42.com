import mixin, { assign, events } from "/simple/mixin.js";
import { is } from "/simple/util.js";

export default class Route {
	constructor(...args){
		this.routes = {};
		Object.assign(this, ...args);
		if (this.parent){
			this.initialize();
		} else {
			this.initialize_router();
		}
	}

	initialize(){
		this.match();
	}

	initialize_router(){
		this.router = this;
		this.parts = window.location.hash.slice(2, -1).replace(/-/g, "_").split("/");
		this.remainder = this.parts.slice(0);
		this.activate(false);
	}

	match(){
		if (this.parent.is_active_route() && this.name === this.router.remainder[0]){
			this.router.remainder.shift();
			this.activate(false);
		}
	}

	activate(push){
		this.router.active_route && this.router.active_route.deactivate();
		this.router.active_route = this;
		push !== false && this.push();
		this.classify();
		this.on && this.on(this);
	}

	is_active(){
		return this.is_active_route() || this.is_active_ancestor();
	}

	is_active_route(){
		return this.router.active_route === this;
	}

	is_active_parent(){
		const active_child = this.get_active_child();
		return active_child && active_child.is_active_route();
	}

	is_active_ancestor(){
		return this.router.active_node.is_descendant_of(this);
	}

	is_descendant_of(route){
		var parent = this.parent;

		while (parent){
			if (route === parent)
				return true;
			parent = parent.parent;
		}

		return false;
	}

	get_active_child(){
		var next = this.router.active_route;
		while (next){
			if (next.parent === this)
				return next;
			next = next.parent;
		}
		return false;
	}

	deactivate(next){
		this.declassify();
		this.off && this.off(this, next);
	}
	
	declassify(){
		if (this.views){
			for (const view of this.views){
				view.removeClass("active active-route");
			}

			var parent = this.parent;

			if (parent && parent.views)
				for (const view of parent.views)
					view.removeClass("active-parent");

			while (parent && parent.views){
				for (const view of parent.views){
					view.removeClass("active active-ancestor");
				}

				parent = parent.parent;
			}
		}
	}

	classify(...views){
		if (is.arr(views[0])){
			this.views = views[0];
		} else if (views.length){
			this.views = views;
		}
		if (this.views){
			for (const view of this.views){
				view.addClass("active active-route");
			}

			var parent = this.parent;

			if (parent && parent.views)
				for (const view of parent.views)
					view.addClass("active-parent");

			while (parent && parent.views){
				for (const view of parent.views){
					view.addClass("active active-ancestor");
				}

				parent = parent.parent;
			}
		}
	}

	push(){
		if (this === this.router){
			window.history.pushState("", document.title, window.location.pathname);
		} else {
			window.location.hash = this.path();
		}
	}

	add(name, on, off){
		if (is.pojo(on)){
			return this.add_route(name, on);
		} else if (is.fn(on)) {
			return this.add_route(name, { on, off })
		}
	}

	add_route(name, props){
		const route = new this.constructor({
			name, parent: this, router: this.router
		}, props);

		if (this.routes[name]) console.warn("route override?");
		else this.routes[name] = route;
		
		if (!this[name]) this[name] = route;
		else console.warn("prop", name, "taken");
		
		return route;
	}

	part(){
		return this.name.replace(/_/g, "-");
	}
	
	path(){
		return "/" + this.parts().join("/") + "/";
	}

	parts(){
		var parent = this.parent;
		const parts = [this.part()];

		while (parent && parent !== this.router){
			parts.unshift(parent.part());
			parent = parent.parent;
		}

		return parts;
	}
}