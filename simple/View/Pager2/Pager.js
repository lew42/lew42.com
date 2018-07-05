export default class Pager {
	constructor(...args){
		this.pages = {};
		this.add(...args);
	}

	add(pages){
		for (const name in pages){
			this.add_page(name, pages[name]);
		}
		return this;
	}

	add_page(name, page){
		this.pages[name] = page.assign({
			activate(arg){
				return this.emit("activate", arg); // returns this;
			}
		}).on("activate", () => {
			this.current && this.current.removeClass("active").emit("deactivate");
			this.current = page.addClass("active");
		});

		return this;
	}
}