import PageView from "./PageView.js";

export default class Page {
	constructor(...args){
		this.assign(...args);
		this.initialize();
	}

	initialize(){}

	render(){
		return new this.View({
			page: this,
			content: this.content
		}); // decouples, event-driven views
	}

	assign(...args){
		return Object.assign(this, ...args);
	}
}

Page.prototype.View = PageView;