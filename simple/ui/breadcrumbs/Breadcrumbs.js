class Breadcrumbs extends View {
	instantiate(...args){
		this.events = new Events("activate this that another");
		this.assign(...args);
		this.prerender();
		this.render();
		this.initialize();
	}

	add(paths){
		this.tree = paths;
	}

	get tree(){ 
		return this._tree; 
	}
	
	set tree(value){ 
		this._tree = value; 
	}


	get activate(){
		// return this.events.activate.exe;
		return (...args) => this.emit("activate", ...args);
	}

	set activate(value){
		this.on("activate", value);
	}

	event(event, ...args){
		return this._events[event] || 
	}
}

/*

div.breadcrumbs
	div.bc div.bc ...

What is the minimal functionality for breadcrumbs?

If you need a router to handle hash-initiated activation, and click events necessarily require some other functionality..?

Well, a base-path breadcrumb needs to get/set window.location.

But, what does the simple/ui/breadcrumb/ do?

Maybe it provides an interface for testing, but that interface doesn't need to be used?  And some methods for mocking?

Its all about the .render()...

But then, does the base-path breadcrumb need to extend this?  If it doesn't really do anything substantial, and all the functionality is styling/testing, then maybe you just start from scratch, and utilize this for reference.

********!!!!!!!!!!!*********
Maybe its just a template - a documentation of the html and css that make it work.  And how it works.  And iterating through the various options/styles...

new Breadcrumbs({
	tree: new Tree? || {}
})

breadcrumbs structure:

root
	one
		oneA
		oneB
	two
		twoA
		twoB
	three
		etc

bc.add({
	one: {
		oneA: ...
	}
});


create Tree as a common interface for Router, Breadcrumbs, etc...?


*/