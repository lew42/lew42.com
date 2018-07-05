import mixin, { assign, events } from "/simple/mixin.js";
import { is } from "/simple/util.js";
class RouteBase {
	constructor(...args){
		this.routes = {};
		Object.assign(this, ...args);
		this.initialize();
	}

	initialize(){}

	activate(push){
		this.router.current.deactivate(this);
		this.router.current = this;
		push !== false && this.push();
		this.active = true;
		this.on && this.on(this);
	}

	deactivate(next){
		this.active = false;
		this.off && this.off(this, next);
	}

	push(){
		window.location.hash = this.path();
	}

	is_descendant_of(route){
		if (this.parent === route)
			return true;

		var parent = this.parent;

		while (parent){
			if (route === parent)
				return true;
			parent = parent.parent;
		}

		return false;
	}

	has_active_descendant(){
		for (const name in this.routes){
			const route = this.routes[name];
			if (route.active || route.has_active_descendant())
				return true;
		}

		return false;
	}

	add(name, on, off){
		if (is.pojo(on)){
			return this.add_route(name, on);
		} else if (is.fn(on)) {
			return this.add_route(name, { on, off })
		}
	}

	// add(routes, value1, value2){
	// 	// .add("route_name", fn || {})
	// 	if (is.str(routes)){
	// 		return this.add_named(routes, value1, value2);

	// 	// .add({ route_name: fn || {} })
	// 	} else if (is.pojo(routes)) {
	// 		return this.add_pojo(routes);

	// 	} else {
	// 		console.warn("oops");
	// 		return this;
	// 	}
	// }

	// add_named(name, value){
	// 	// return new route
	// 	if (is.fn(value)){
	// 		return this.add_named_fn(name, value);
	// 	} else if (is.pojo(value)){
	// 		return this.add_named_pojo(name, value);
	// 	} else {
	// 		throw "only fns or pojos for now";
	// 	}
	// }

	// add_named_pojo(name, routes){
	// 	return this.add_route(name).add(routes);
	// }

	// add_named_fn(name, fn){
	// 	return this.add_route(name, { fn });
	// }

	// add_pojo(routes){
	// 	for (const name in routes){
	// 		this.add_named(name, routes[name]);
	// 	}

	// 	// return self
	// 	return this;
	// }

	add_route(name, props){
		const route = new Route({
			name, parent: this, router: this.router
		}, props);

		if (this.routes[name]) console.warn("route override?");
		else this.routes[name] = route;
		
		if (!this[name]) this[name] = route;
		else console.warn("prop", name, "taken");
		
		return route;
	}

	part(){}
	path(){}
}

class Route extends RouteBase {
	initialize(){
		this.match();
	}

	match(){
		if (this.parent.active && this.name === this.router.remainder[0]){
			this.router.remainder.shift();
			this.activate(false);
		}
	}

	part(){
		return this.name.replace(/_/g, "-");
	}

	parts(){
		var parent = this.parent;
		const parts = [this.part()];

		while (parent && parent.part()){
			parts.unshift(parent.part());
			parent = parent.parent;
		}

		return parts;
	}

	path(){
		return "/" + this.parts().join("/") + "/";
	}
}

export class Router extends RouteBase {
	initialize(){
		this.router = this;
		this.root = true;
		this.parts = window.location.hash.slice(2, -1).replace(/-/g, "_").split("/");
		this.remainder = this.parts;
		this.current = this;
		this.activate(false);
	}

	push(push){
		if (push !== false){
			window.history.pushState("", document.title, window.location.pathname);
		}
	}

	part(){
		return false;
	}

	path(){
		return false
	}
}

export default class Routerx {
	constructor(...args){
		this.routes = {};
		
		Object.assign(this, ...args);

		if (this.name){
			this.initialize();
		} else {
			this.root = true;
			this.active = true;
			this.router = this;
			this.current = this;
			this.set_parts();
			this.remainder = this.parts;
		}
	}

	set_parts(){
		this.parts = window.location.hash.slice(2, -1).replace(/-/g, "_").split("/");
	}

	initialize(){
		this.view.activate = function activate(push){
			return this.emit("activate", push);
		};

		this.view.on("activate", this.activate.bind(this));

		this.match();
	}

	deactivate(){
		this.view && this.view.removeClass("active").emit("deactivate");
	}

	activate(view, e){
		this.active = true;
		this.router.current.deactivate();
		this.router.current = this;
		this.view.addClass("active");
		// this.add_active_path_classes();
		this.push(e.detail);
	}

	add_active_path_classes(){

	}

	push(push){
		if (push !== false){
			window.location.hash = this.path();
			this.set_parts();
		}
	}

	add(routes){
		for (const name in routes){
			this.add_route(name, routes[name]);
		}
		return this;
	}

	add_route(name, view){
		return this.routes[name] = new Routerx({ name, view,  parent: this,  router: this.router });
	}

	match(){
		if (!this.parent || this.parent.active){
			if (this.part() === this.router.remainder[0]){
				this.router.remainder.shift();
				this.view.activate(false);
			}
		} else {
			return false;
		}
	}

	part(){
		return this.name.replace("_", "-");
	}

	path(){
		var parent = this.parent;
		const path = [this.part()];

		while (parent){
			parent.part && path.unshift(parent.part);
			parent = parent.parent;
		}

		return "/" + path.join("/") + "/";
	}
}

mixin(Router, assign, events);