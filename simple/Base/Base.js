export default class Base {
	constructor(...args){
		this.assign(...args);
		this.initialize();
	}

	initialize(){}
	
	assign(...args){
		return Object.assign(this, ...args);
	}
}