// import simple, { el, div, icon, test, assert, write, View } from "/simple.js";
import View, { el, div } from "/simple/View/View.js";
import Test, { test, assert } from "/simple/Test/Test.js";
import Base from "/simple/Base/Base.js";

View.stylesheet("/simple/View/Pager/Pager.css");

class Page extends Base {
	// @prop title
	render(){
		this.pager.$pages.append(this.view = div(".page", this.content));
	}

	render_tab(){
		this.pager.$tabs.append(this.tab = div(".tab", this.name).click(tab => {
			this.pager.activate(this);
		}));
	}

	activate(){
		if (!this.view)
			this.render();

		this.view.addClass("active").show();
		this.tab.addClass("active");
	}

	deactivate(){
		this.tab.removeClass("active");
		this.view.hide().removeClass("active");
	}
}

// Page.prototype.View = class PageView extends simple.View {

// }

// Page.prototype.View.prototype.classes = "page";

export default class Pager extends View {
	initialize(){
		this.pages = [];
	}

	content(){
		this.$tabs = div(".tabs");
		this.$pages = div(".pages");
	}

	add(pages){
		for (const name in pages){
			this.add_page({
				name: name,
				content: pages[name]
			});
		}
		return this;
	}

	add_page(page){
		if (!(page instanceof Page))
			page = new Page(page);

		this.pages.push(page);
		
		page.pager = this;

		page.render_tab();

		if (!this[page.name]){
			this[page.name] = page;
		} else {
			console.warn("page name already taken");
		}

		!this.current && this.activate(page);

		return this;
	}

	activate(page){
		this.current && this.current.deactivate();
		page.activate();
		this.current = page;
	}
}

Pager.prototype.tabs = true;
Pager.prototype.classes = "pager";