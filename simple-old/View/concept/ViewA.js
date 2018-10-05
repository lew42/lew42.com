export default class ViewA {

	constructor(...options){
		this.assign(...options);
		this.prerender();
		this.render();
		this.initialize();
	}

	prerender(){
		this.el = document.createElement(this.tag || "div");
	}

	render(){}

	initialize(){}

	assign(...args){
		return Object.assign(this, ...args);
	}

	static assign(...options){
		return Object.assign(this, ...options);
	}
	
}