import View from "../View.js";

View.stylesheet("/simple/View/Item/Item.css");

export default class Item extends View {
	// initialize(){
	// 	console.log(this.constructor.name);
	// }
}

Item.prototype.classes = "item";

export function item(...args){
	return new Item().append(...args);
};