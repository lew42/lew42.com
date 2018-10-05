import mixin, { assign, events } from "/simple/mixin.js";
import { is } from "/simple/util.js";


class HashPath {
	constructor(){

	}
}


export default class Route {
	constructor(...args){
		this.routes = {};
		this.assign(...args);
		if (this.parent){
			this.initialize();
		} else {
			this.initialize_router();
		}
	}

	__push(){
		this.hashpath.push();
	}

	__match(){
		this.hashpath === this.router.next
	}

	initialize(){
		this.match();
	}

	match(){
		// if (!this.router.)
		if (this.parent.is_active_route() && this.name === this.router.remainder[0]){
			this.router.remainder.shift();
			this._skip_push = true;
			this.activate(false);
		}
	}

	is_match(){
		if (this.lazy){

		} else {
			return this.parent.is_active_route() && this.name === this.router.remainder[0];
		}
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

	// get parent(){
	// 	return this._parent;
	// }

	// set parent(parent){
	// 	this._parent = parent;
	// 	this.initialize();
	// }

	/*

	.activate(cb) -> on("activate", cb);
	.activate() -> emit("activate")

	*/

	get activate(){
		return this._activate;
	}

	/* 
	 * 
	 * 
	 **/
	set activate(value){
		this.on("activate", value);
	}

	_activate(push = true){
		this.activate_route(push);
		this.classify();
		this.emit("activate", this);
	}

	// activated(){}

	/*
	// or
	activate(){
		this.activate_route();
		this.classify();
		this.activated();
	}

	// or
	activate(){
		// pre
		super.activate();   // won't work when instantiating, only extending
		// post
	}
	*/

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

	get deactivate(){
		return this._deactivate;
	}

	set deactivate(cb){
		this.on("deactivate", cb);
	}

	_deactivate(){
		this.declassify();
		this.emit("deactivate", this);
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
			// clear hash
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
}

mixin(Route, assign, events);