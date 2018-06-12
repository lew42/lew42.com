import View from "../View.js";
// import "./font-awesome.js";
import "./vivid-icons.min.js"

console.warn("vivid icons are initialized on DOMContentLoaded, which is too early for my views");

export default class VividIcon extends View {
	instantiate(...args){
		this.prerender();
		this.assign(...args);
	}

	set icon(icon){
		if (icon){
			this.attr("data-vi", icon);
			this._icon = icon;
		}
		return this;
	}

	get icon(){
		return this._icon;
	}

	set size(size){
		if (this._size) this.removeClass("fa-" + this._size);
		this.addClass("fa-" + size);
		this._size = size;
		return this;
	}

	get size(){
		return this._size;
	}
}

VividIcon.prototype.tag = "i";

export function icon(icon){
	return new VividIcon({ icon });
};