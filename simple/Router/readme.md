#  Hmm

What's the most basic use cases?

## Simple Switching

### Use body as container?

This could be the default for a simple Pager...

Or, you could provide a container: view.

What's the API?

router?

const pager = new Pager();

pager.page()?
pager.add()?


page("name", pg => {
	// content
});

// or

page("name", view); // use view as page container?

Or maybe it's better to just wrap everything....  Use the .page div as a functional wrapper.  We should never build any UI that is so dependent on the nesting structure that adding a dummy wrapper will break it.  Because that needs to happen, a lot.

	Drawbacks of additional wrappers:

	When you try to move things around, the CSS can break (if your CSS selectors are hierarchy-dependent).

	If you were try to drag/drop, the targeting might be a little tricky.  We might have to have mappings?  Well, you'd usually want to visually choose container vs content...

## Call it a page?

A test might not be a bad name.  But the tests could work a little differently.

What else could work?  Page is ok, but if we wanted Page to be a little more substantial/OO, then maybe we can come up with a different name?

Or maybe they're just sections, and they're wired up as... pagelets? poj?

sections
pages
pagelets

viewports

screen
panel
pane
window
widget
thingy
post

url.hash.page()



route isn't bad...

We can have class Router and class Route
The Router is recursive, and makes the actual hash routes.
The Route is a view controller?

Or just bake them together... And let Routes have views?
Or maybe just extend a base router, 

routes?

route("name", view);


Create a default router?
Default config --> use body?

In an actual site config, you can override initialize_router in order to either configure the router, or whatever.

import simple, { route }

route("one", r => {
	r.whatever()
});