export default class Page {
	constructor(){
		this.assign(...args);
		this.initialize();
	}

	render(){
		return div(this.name); // decouples, event-driven views
	}
}