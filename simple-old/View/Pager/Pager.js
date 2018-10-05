// import simple, { el, div, icon, test, assert, write, View } from "/simple.js";
import View, { el, div } from "/simple/View/View.js";
import Test, { test, assert } from "/simple/Test/Test.js";
import Base from "/simple/Base/Base.js";
import { is } from "/simple/util.js";

View.stylesheet("/simple/View/Pager/Pager.css");

/*

Pager
	Tabs
		Tab
	Pages
		Page

Pager.add({
	name: {
		tab: <viewable>, // variable viewable
			// 1) pass in a view (or dom?) and it gets adopted
			// 2) pass in a str or fn or pojo, and it gets wrapped
		page: <viewable>
	}
})


div("str") -> <div>str</div>
div({ props }) -> <div><divs...></div>
div(fn(){}) -> captures divs

*/

export default class Pager extends View {
	instantiate(...args){
		this._pages = [];

		this.assign(...args);
		this.prerender();
		this.render();
		this.initialize();
	}

	content(){ 
		this.addClass("base");
		this.append({
			tabs: div(),
			pages: div()
		});
	}

	/*

	view.become(<viewable>)
		-> if is.view, this.el = view.el; // "mount" ?
		else, this.content = <viewable> ?

	add({
		name: "str" // page content
		name: fn // page content
		name(){ return {
			props // page content props
		}}
		name: view // page itself
		name: {
			tab: "str" // tab content
			tab: fn // tab content
			tab: view // tab itself
			content: // page content
			page: "str" // page content
			page: view // page itself

			if (.page is view, --> page itself)
			if (.page and !not view, --> content)

			el: view.el // --> will auto "mount"
		}
	})
	*/
	add(...args){
		if (is.str(args[0])){
			this.add_page(args[0], args[1]);
		} else {
			for (const name in args[0]){
				this.add_page(name, args[0][name]);
			}
		}
		return this;
	}

	make_page(name, value){
		const Page = this.get_page_constructor();
		return Page.use(value, { name });
	}

	add_page(name, value){
		const Page = this.Page || this.constructor.Page;
		const page = Page.use(value, { name, pager: this });

		this._pages.push(page);
		
		page.render_tab();
		page.appendTo(this.pages);

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


Pager.Page = class Page extends View {
	instantiate(...args){
		this.assign(...args);
		this.prerender();

		
		this.hide();

		// if .add({ name: div() }), the div is captured elsewhere
		// does lazy rendering affect SEO?  content that's not rendered can't be indexed...
		// if (this.content && this.content instanceof View)
		// 	this.render();
	}

	render(){
		super.render();
		this.rendered = true;
	}

	render_tab(){
		this.tab = View.use(this.tab || this.name)
			.addClass("tab")
			.click(t => {
				this.pager.activate(this);
			})
			.appendTo(this.pager.tabs);
	}

	activate(){
		if (!this.rendered)
			this.render();

		this.addClass("active").show();
		this.tab.addClass("active");
	}

	deactivate(){
		this.tab.removeClass("active");
		this.hide().removeClass("active");
	}
}