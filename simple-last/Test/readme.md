# Requirements

## export and accept config

export default new Test({
	assignments
}).add({
	tests to run
});

// test does not auto-render
// you need to call test.run(...args) or test.render(...args) to run


test("name", t => {
	// auto renders

	test("sub", sub => {
		// can be nested?
	})
});

// or

test("name", {
	assignments
}, {
	additions
});

// or

test("name", {
	assignments
}, name => {
	name.assignments;
});


## test pager

maybe, if you import /simple/Test/Test.js?, it sets up the auto pager?

Auto-run tests?

test.render() => render/run the test...?

What about matching?
	If there's a hash, the .render() is skipped?


### Test Paging vs Conditional Rendering

With the past system, the test runner would just skip rendering non-matching tests.

With a test pager, we would be rendering a preview on the first page, and then when #iso'd, we would rerender the whole thing...

	This works well for a style guide, when we have a preview/full view

	However, for functional tests and even quick visual tests, you might not want to break everything into preview/fullview.

	Yet, if you have an auto-preview (which can just be the name of the test), and the nohash renders the whole thing, and then clicking to #iso simply renders it by itself...

	This is basically the same thing between both paging and conditional rendering?

	BUT, if the control is at the page-level (either render the root page, or a sub page), this is significantly different than conditional rendering.

#### Page-Level Control

Instead of specific blocks doing conditional rendering, you basically just render this page or that page.  

*Sequential Activation*:  Before, I would render base-level pages (activating them), and then sub pages would be rendered/activated as they match.

*Page Skipping*:  The alternative would be to only render the subs.  But, depending on how the function blocks are setup, you might not even know about the subs, until the parent is rendered...

And so, coming back to Page Control vs Conditional Block Control:  You basically can't have page-level control?  If you want isolation, AND you need to sequentially activate, then you MUST conditionally render each block?

Well, you could just activate the parent page, and then activate the child page (sequential activation).  And the "control" could still be based on the parent render function ("page control").  Basically, each page renders itself, which asks sub pages to preview themselves or whatever.  If there's no matching hash, then that's it.  If there's a match, then activate that sub page, per usual.

To the user, they might not even see the sequential activation.  They just see the final page activated.  Same with deactivation?  

Well, with sequential activation, you might have a random /#/hash/path/ jump into the url at any time.  And so, when another route is activated, we go back to the router, deactivate all, and start activating each match (as with a normal load).


#### Visualization

We should be able to see new routes created, and their structure/matching processes.

Maybe you have a set of examples, which each load up a "virtual browser".  And the "url" is just an interactive breadcrumb?


This could work differently for Tests vs Styles....


## Simple Functional Routes

Anywhere (inside views, wrapping views), you could just create simple `route("hash", () => {})` blocks.  Basically, it says, "if #hash, render".

Does it create an actual View (like a page)?  This would make it much easier to switch it on/off.  And the activate/deactivate could be automatically wired in.

And the route div could be appended whereever its created.

And could be nested.

And you could use `test("name", t => {});` blocks for the nohash behavior.

And `route()` blocks would only render if/when #hash matches.

```
route("one", one => {
	// one is a view?
	route("a", a => {

	});
});
```

## reloading?

The past versions of the test runner just reload the page when you iso.  This isn't absolutely necessary, but it's helpful to guarantee a clean console/environment.



## Simplest Model?

// before pages wrapper

route(() => {}); // renders the pages wrapper and default page

// sub pages can get added wherever
route("name", () => {}); // sub page

// added after pages wrapper



router = new Router();

router.default(() => {});
router.split(); // list + viewport
router.switch(); // viewport + swap

div.c("cols",
	div.c("left", router.list()),
	div.c("right", router.breadcrumbs(), router.render())
);  // maybe each page needs its own list...

The way in which new pages are added, rendered, and interact with eachother should be a custom implementation.  And I can create various examples...?


router.no_hash (&& no_match)

router.has_hash
	router.hash_no_match (&& no_match)
	router.hash_match

Avoid async, use init(this)...

router.add("name", {
	init: route => this.route = route, // sets up page.route for immediate activation...
});

view.css_class_prefix = "lew42";
view.append({ one, two, three }) ==> lew42-one, lew42-two, lew42-three

