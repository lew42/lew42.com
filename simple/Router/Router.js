import is from "/simple/is/is.js";

export default class Router {
	constructor(){
		this.assign(...arguments);

		this.routes = {};

		if (!this.parent){
			this.initialize_router();
		} else if (this.auto_init){
			this.initialize();
		}

		this.init(this);
	}

	init(){}
	
	initialize_router(){
		this.router = this;
		this.name = this.name || "router";

		// break the /#/hash/hash-parts/ into ["hash", "hash_parts"]
		this.hash = window.location.hash && window.location.hash.slice(2, -1).replace(/-/g, "_").split("/");
		
		// activate without push
		this.activate(false);
	}

	initialize(){
		if (this.parent.hash && this.parent.hash.length)
			this.match();
		else
			this.nohash();
	}

	nohash(){}

	match(){
		if (this.is_match()){
			this.hash = this.parent.hash.slice(1);
			this.activate(false);
		}
	}

	is_match(){
		return this.parent.is_active_route() && this.name === this.parent.hash[0];
	}


	activate(push = true){
		console.log("activate", this.name);
		this.activate_route(push);
		this.activated();
	}

	activated(){}

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
		return this.router.active_route.is_descendant_of(this);
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
		this.deactivated();
	}

	deactivate_route(){}
	deactivated(){}

	push(){
		if (this === this.router){
			// remove hash
			window.history.pushState("", document.title, window.location.pathname);
		} else {
			window.location.hash = this.path();
		}
	}

	add(name, props){
		if (is.pojo(name)){
			for (const n in name){
				this.add_route(n, name[n]);
			}
		} else {
			 return this.add_route(name, props);
		}
	}

	add_route(name, props){
		const route = new this.constructor({
			name, parent: this, router: this.router, auto_init: true
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

	make(n){
		for (let i = 1; i < n+1; i++){
			this.add("test"+i, function(){
				console.log("activated " + this.path());
			}, function(){
				console.log("deactivated "+ this.path());
			});
		}
	}

	assign(){
		return Object.assign(this, ...arguments);
	}
}