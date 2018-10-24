export default class Test {
	constructor(){
		this.assign(...arguments);
		this.initialize();
	}

	assign(){
		return Object.assign(this, ...arguments);
	}
}