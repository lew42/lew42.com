What kind of syntax am I looking for?

So, you need to create components - individual atoms that compose large scale apps.

You could try to append everything in one render function:

this.append({
	bar: {
		icon: icon("beer"),
		label: this.label(),
		menu: btn("menu")
	}
});


So, in any given application, there's likely to be hundreds of UI things...

Am I really going to create Uppercase classes and lowercase() api shorthands?  Just to avoid using "new"?

I suppose...


What's another option?

You try to precompose certain pieces, so that you can do something like...

this.append({
	bar: this.bar,
	content: this.content, // but, the property names conflict here..
});




What's the quickest way?  Quickest as in performance, or quickest as in development time?


Instead of even providing a function, one of the fastest ways would be to just use a div function:

div({
	bar: {
		icon: icon("beer"),
		title: this.title,
		menu: menu(this.menu),
	},
	content: {}
})

And do it all inline...

Or, extend the View class in another file...

class ThingView extends View {
	render(){
		bar({
			icon: icon("beer"),
			title: this.thing.title,
			menu: menu(this.thing.menu)
		})
	}
}

Or, maybe its easier to simply rewrap the functions?

// this is how composition is typically done in code
my_bar(){
	return bar().addClass("whatever");
}

Yet, if you do this a lot, you get spagetti code.