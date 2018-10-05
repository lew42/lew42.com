import View { el, div } from "/simple/View/View.js";
import { is } from "../util.js";

// Template?

export default class Component extends View {

}

/*

Objectives:
1. append({
	nested: {
		subs: ...
	}
})

Attach all to the component, rather than the nested view...
This ensures you don't override any existing property, which ensures css class integrity:

.tpl#_sub doesn't collide with another .tpl#_sub

2. Track all components, at all levels, and let them add/remove their own versions

addVersion(3, 9, 42){
	for (const comp in this.components){
	 	comp.addVersion(...args);
	}
}

*/