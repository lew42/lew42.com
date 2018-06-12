import { is, obj } from "../util.js";

export default class View {
	constructor(...args){
		this.prerender(...args);
		this.assign(...args);
		this.append(this.render);
		this.initialize();
	}

	prerender(...args){
		if (is.obj(args[0])){
			this.assign(obj.pluck(args[0], ["tag", "classes"]));
		}
		
		this.el = document.createElement(this.tag || "div");
		View.captor && View.captor.append(this);
		this.addClass(this.classes);
	}

	render(){}

	initialize(){}

	append(...args){
		for (const arg of args){
			if (arg && arg.el){
				arg.parent = this;
				this.el.appendChild(arg.el);
			} else if (is.pojo(arg)){
				this.append_pojo(arg);
			} else if (is.obj(arg)){
				this.append_obj(arg);
			} else if (is.arr(arg)){
				this.append.apply(this, arg);
			} else if (is.fn(arg)){
				this.append_fn(arg);
			} else {
				// DOM, str, undefined, null, etc
				this.el.append(arg);
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
			view = (new this.constructor()).append(value);
		}

		this[prop] = view.addClass(prop).appendTo(this);

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
	
	addClass(classes){
		classes && classes.split(" ").forEach(cls => this.el.classList.add(cls));
		return this;
	}

	removeClass(classes){
		classes && classes.split(" ").forEach(cls => this.el.classList.remove(cls));
		return this;
	}

	hasClass(cls){
		return this.el.classList.contains(cls);
	}

	attr(name, value){
		if (is.def(value)){
			this.el.setAttribute(name, value);
			return this;
		} else {
			return this.el.getAttribute(name);
		}
	}

	click(cb){
		return this.on("click", cb);
	}

	on(event, cb){
		this.el.addEventListener(event, (...args) => {
			cb.call(this, this, ...args);
		});

		return this;
	}

	removable(event, cb){
		const wrapper = (...args) => {
			cb.call(this, this, ...args);
		};

		this.el.addEventListener(event, wrapper);

		return () => {
			this.el.removeEventlistener(event, wrapper);
		};
	}

	empty(){
		this.el.innerHTML = "";
		return this;
	}

	focus(){
		this.el.focus();
		return this;
	}

	show(){
		this.el.style.display = "";
		return this;
	}

	styles(){
		return getComputedStyle(this.el);
	}

	// inline styles
	style(prop, value){
		// set with object
		if (is.obj(prop)){
			for (var p in prop){
				this.style(p, prop[p]);
			}
			return this;

		// set with "prop", "value"
		} else if (prop && is.def(value)) {
			this.el.style[prop] = value;
			return this;

		// get with "prop"
		} else if (prop) {
			return this.el.style[prop];

		// get all
		} else if (!arguments.length){
			return this.el.style;
		} else {
			throw "whaaaat";
		}
	}

	toggle(){
		if (this.styles().display === "none")
			return this.show();
		else {
			return this.hide();
		}
	}

	index(){
		var index = 0, prev;
		// while (prev = this.el.previousElementSibling)
	}

	hide(){
		this.el.style.display = "none";
		return this;
	}

	remove(){
		this.el.parentNode && this.el.parentNode.removeChild(this.el);
		return this;
	}

	editable(remove){
		remove = (remove === false);
		const hasAttr = this.el.hasAttribute("contenteditable");

		if (remove && hasAttr){
			// console.warn(this.el, "remove ce");
			this.el.removeAttribute("contenteditable");
		} else if (!remove && !hasAttr) {
			// console.warn(this.el, "add ce");
			this.attr("contenteditable", true)
		}
		return this;
	}

	value(){
		// get&set?
		return this.el.innerHTML;
	}

	assign(...args){
		return Object.assign(this, ...args);
	}

	static set_captor(view){
		View.previous_captors.push(View.captor);
		View.captor = view;
	}

	static restore_captor(){
		View.captor = View.previous_captors.pop();
	}

	static stylesheet(url){
		return (new View({ tag: "link" })).attr("rel", "stylesheet").attr("href", url).appendTo(document.head);
	}
}

export function el(token, ...args){
	return new View(parseToken(token)).append(...args);
}

export function div(...args){
	const opts = {};

	if (is.str(args[0]) && args[0][0] === "."){
		opts.classes = args[0].split(".").slice(1).join(" ");
		args.shift();
	}

	return new View(opts).append(args);
}

View.previous_captors = [];


document.ready = new Promise((res, rej) => {
	if (/comp|loaded/.test(document.readyState))
		res(document.body);
	else
		document.addEventListener("DOMContentLoaded", () => {
			res(document.body);
		});
});


function parseToken(token){
	if (!token)
		throw "must provide element token";

	const parts = token.split(".");
	const results = {};

	if (parts[0] !== "")
		results.tag = parts.shift();

	if (parts.length)
		results.classes = parts.join(" ");

	return results;
}