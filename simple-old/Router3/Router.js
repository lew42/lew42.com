import { is } from "/simple/util.js";

export default class Router {
	constructor(){
		this.routes = {};
		this.assign(...arguments);
		if (this.parent){
			this.initialize_route();
		} else {
			this.initialize_router();
		}
	}

	initialize_route(){
		this.match();
	}

	match(){
		if (this.is_match()){
			this.router.remainder.shift();
			this.activate(false);
		}
	}

	is_match(){
		return this.parent.is_active_route() && this.name === this.router.remainder[0];
	}

	initialize_router(){
		this.router = this;

		// break the /#/hash/hash-parts/ into ["hash", "hash_parts"]
		this.parts = window.location.hash.slice(2, -1).replace(/-/g, "_").split("/");
		
		// for matching sub routes
		this.remainder = this.parts.slice(0);

		// activate without push
		this.activate(false);
	}

	activate(push = true){
		this.activate_route(push);
	}

	activate_route(push = true){
		this.router.active_route && this.router.active_route.deactivate();
		this.router.active_route = this;
		push && this.push();
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

	deactivate(){
		this.deactivate_route();
	}

	push(){
		if (this === this.router){
			window.history.pushState("", document.title, window.location.pathname);
		} else {
			window.location.hash = this.path();
		}
	}


	add(name, activate, deactivate){
		if (is.pojo(name)){
			for (const n in name){
				this.add(n, name[n]);
			}
		} else if (is.pojo(activate)){
			return this.add_route(name, activate);
		} else if (is.fn(activate)) {
			return this.add_route(name, { activate, deactivate })
		} else {
			return this.add_route(name);
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

	assign(){
		return Object.assign(this, ...arguments);
	}
}