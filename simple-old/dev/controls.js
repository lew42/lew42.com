import View, { el, div } from "/simple/View/View.js";

class CSSClassControl extends View {

	content(){ return this.css_class_name }

	click_to_toggle(){
		return this.click(() => {
			this.toggleClass("active");
			this.view.toggleClass(this.css_class_name);
		});
	}

	click_to_switch(){
		return this.click(() => {
			for (const control of this.controls){
				control.deactivate();
			}
			this.activate();
		});
	}

	activate(){
		this.addClass("active");
		this.view.addClass(this.css_class_name);
	}

	deactivate(){
		this.removeClass("active");
		this.view.removeClass(this.css_class_name);
	}
}

const controls = {};

export default {
	toggle(view, css_class_name){
		return new CSSClassControl({ css_class_name, view }).click_to_toggle();
	},
	toggles(view, ...css_class_names){
		for (const css_class_name of css_class_names){
			new CSSClassControl({ css_class_name, view }).click_to_toggle();
		}
	},
	switch(view, ...css_class_names){
		const controls = [];
		for (const css_class_name of css_class_names){
			controls.push(new CSSClassControl({ css_class_name, view, controls }).click_to_switch())
		}
	}
};