import View from "../View.js";
import "./font-awesome.js";

export default class Icon extends View {
	icon(icon){
		if (icon){
			this.removeClass("fa-" + this._icon);
			this.addClass("fa-" + icon);
			this._icon = icon;
			return this;
		} else {
			return this._icon;
		}
	}
}

Icon.prototype.tag = "i";
Icon.prototype._icon = "circle";
Icon.prototype.classes = "icon fa fa-fw fa-circle";

export function icon(icon){
	const i = new Icon();
	if (icon) i.icon(icon);
	return i;
};

function icon2(icn){
	return el("i.icon.fa.fa-fw.fa-" + icn);
}