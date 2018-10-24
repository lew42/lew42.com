import View from "../View/View.js";

export default class Site {
	constructor(){
		Object.assign(this, ...arguments);
		this.initialize();
	}

	initialize(){
		this.initialize_body();
		this.render();
	}

	initialize_body(){
		this.body = new View({
			el: document.body,
			capturable: false
		});
	}

	render(){
		View.set_captor(this.body);
	}
}