import { is } from "../util.js";
import View from "../View/View.js";

const SVG_NS = "http://www.w3.org/2000/svg";
class SVGBase {
	constructor(...args){
		Object.assign(this, ...args);
		this.prerender();
		this.render();
		document.body.appendChild(this.el);
	}

	prerender(){
		this.el = this.el || document.createElementNS(SVG_NS, this.tag || "svg");
		this.capturable && View.captor && View.captor.append(this);
		this.classify && this.classify();
	}

	classify(){
		this.addClass(this.classes);

		var cls = this.constructor;

		while (cls !== SVG){
			this.addClass(cls.name.replace("SVG", "").toLowerCase());
			cls = Object.getPrototypeOf(cls);
		}

		if (this.name)
			this.addClass(this.name);
	}

	render(){
		this.content && this.append(this.content);
	}

	attr(name, value){
		if (is.def(value)){
			this.el.setAttributeNS(null, name, value);
			return this;
		} else {
			return this.el.getAttributeNS(null, name);
		}
	}

	addClass(name){
		if (!this.hasClass(name)){
			this.attr("class", 
				(this.attr("class") || "").trim().split(" ").concat([name.split(" ")]).join(" ")
			);
		}
		
		return this;
	}

	append(...args){
		const container = (this.container && this.container.el) || this.el;

		for (const arg of args){
			if (arg && arg.el){
				arg.parent = this;
				container.appendChild(arg.el);
			} else if (is.pojo(arg)){
				// this.append_pojo(arg);
				console.error("oops");
			} else if (is.obj(arg)){
				// this.append_obj(arg);
				console.error("oops");
			} else if (is.arr(arg)){
				this.append.apply(this, arg);
			} else if (is.fn(arg)){
				this.append_fn(arg);
			} else {
				// DOM, str, undefined, null, etc
				container.append(arg);
			}
		}
		return this;
	}

	append_fn(fn){
		View.set_captor(this);
		const returnValue = fn.call(this, this);
		View.restore_captor();

		if (is.def(returnValue))
			this.append(returnValue);

		return this;
	}

	append_obj(obj){
		if (!obj.render) throw "objects must have .render method";
		this.append(obj.render());
	}

	append_pojo(pojo){
		for (const prop in pojo){
			this.append_prop(prop, pojo[prop]);
		}
		
		return this;
	}

	append_prop(prop, value){
		var view;
		if (value && value.el){
			view = value;
		} else {
			view = (new View()).append(value);
		}

		view.addClass(prop).appendTo(this);

		if (!this[prop]){
			this[prop] = view;
		} else {
			console.warn(`.${prop} property is already taken`);
		}

		return this;
	}

	appendTo(view){
		if (is.dom(view)){
			view.appendChild(this.el);
		} else {
			view.append(this);
		}
		return this;
	}
}

export default class SVG extends SVGBase {

	rect(...args){
		return new SVGBase({ tag: "rect" }, ...args);
	}

	g(...args){
		return new SVGBase({ tag: "g" }, ...args);
	}
}