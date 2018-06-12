import View from "../View.js";
import "./font-awesome.js";

export default class Icon extends View {
	set icon(icon){
		if (icon){
			this.removeClass("fa-" + this._icon);
			this.addClass("fa-" + icon);
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

Icon.prototype.tag = "i";
Icon.prototype._icon = "circle";
Icon.prototype.classes = "fa fa-fw fa-circle";

export function icon(icon){
	return new Icon({ icon });
};