# Router2

// splits Router and Route into 2 classes

# Router3 brings them back together

One disadvantage to splitting them, is that you need to override the .activate() method in both of them.

// prerender Explorer?
--> add sub routes outside of activation

new Router({
	activate(push = true){
		// render on demand
		this.activate_route(push);
		// this.classify(), animate(), etc...
	}
}); // Router auto-activates in initialize()


Will auto-matching upon initialization always work?

What if we instantiate sub routes before activating the parent?

1. initialize() sub route
	2. match() ?
		3. activate()
			4. render() ?
				5. add sub routes
					6. initialize() sub route

If we prerender...

1. page.add("sub")
	2. adds the route before rendering
		3. renders the contents, and potentially adds sub pages

If we add route before rendering (so that the route is available to get sub routes), then we indiscriminantly render all sub routes regardless of match (which may or may not be desired).

Can we do something in-between?

Basically, pre-render all 1st level routes, so that all immediate actions are available.  Then, when one of them is clicked, render all the next-level routes?

You'd basically need to render a sub route if the parent is active.  And stop rendering sub sub routes.  And then figure out how to render the sub sub routes when the sub route is activated.


### What does the Route - View interface look like?

Basically, tab.click => route.activate()
And route.activate() => classify views.

But, that might change, depending on how this comes to...

