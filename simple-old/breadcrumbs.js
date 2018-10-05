import View, { el, div } from "/simple/View/View.js";

View.stylesheet("/simple/css/breadcrumbs.css");

class Breadcrumbs extends View {
	initialize(){
		this.prerender();
		this.render();
		if (!this.parent) this.appendTo(document.body);
	}

	content(){
		const parts = window.location.pathname.split("/").slice(1, -1);
		const paths = {};

		div(".home", "home").click(() => window.location.href = "/");

		for (var i = 0; i < parts.length; i++){
			paths[parts[i]] = "/" + parts.slice(0, i+1).join("/") + "/";
		}
			console.log(paths);
		for (const part in paths){
			div("." + part, part).click(() => window.location.href = paths[part]);
		}
	}
}

export default function breadcrumbs() {
	return new Breadcrumbs();
}

breadcrumbs.Breadcrumbs = Breadcrumbs;