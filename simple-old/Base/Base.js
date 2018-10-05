export default class Base {
	constructor(...args){
		this.instantiate(...args);
	}

	instantiate(...args){
		this.assign(...args);
		this.initialize();
	}

	initialize(){}
	
	assign(...args){
		return Object.assign(this, ...args);
	}

	static mixin(){
		this.prototype.assign(...arguments);
		return this;
	}
}