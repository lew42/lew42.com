import ViewA from "./ViewA.js";

export default class ViewB extends ViewA {
	append(...args){
		for (const arg of args){
			if (arg && arg.el){
				this.el.appendChild(arg.el);
			} else {
				this.el.append(arg);
			}
		}

		return this;
	}

	append_to(view){
		// is view a dom node?
		if (view && view.nodeType > 0){
			view.appendChild(this.el);
		} else {
			view.append(this);
		}

		return this;
	}
}