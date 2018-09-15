Router variants:

Are all routes defined before matching?
Will we activate sub routes between the initial page load and the end route?
Can we rely on lazy routes?
	Basically, no sub routes are added until it is activated (rendered).
	This means we'll never have a sub route activated without its parent being activated/rendered first, which is handy.


Test routing vs HashRouting vs PushState Routing


# PushState Routing

The issue here, is that the new paths must be legit, so that if the browser is refreshed, you're returned a real page.

This is possible, and even practical, if the routes already exist.

In this case, you could import the index.js, and use it to create a PushState link.  When clicked, we would need to adjust the history.  We would never need to match routes on load, because a browser refresh would load the real route.


# Hash Routing

These are dynamic routes - they are handled in addition to the default page request (/page/#/hash/route/ vs /page/).

These must be matched dynamically, because you might be defining them dynamically.  For example, you can't just match /#/one/two/, if the /two/ sub route is only defined after /one/ is rendered.


# Test Routing

The question here, is whether no match should render the initial route?

All root tests should run, even when there's no match?

This is in contradiction to sub tests, and normal hash routes, which must be matched in order to run?

But, even with HashRoutes, you might have times in which you want to display something (like the tab), even if the route isn't matched.  Or even, you want to render the content for the first tab, even if there's no hash.

It's almost like you'd need initialize and activate events...

Initialize always happens, and activate only happens if it matches?

Or even three events:
- initialize
- match --> activate?
- activate

Sometimes, you might want to activate regardless of a match?

Well, it's trickier than that, it's
- if no hash, activate all
- if hash, only activate on match

For the first tab, can we just .activate() it manually?  Or .tabs[0].activate()?  But, that's only if the match fails, or there is no hash...

For the first tab we want to render content.  For subsequent tabs, do we render on demand, or prerender?

RENDER ON DEMAND
This means it won't be indexed?  On tab click -> render then activate?

PRERENDER
Render all, regardless of match?



1.  Page requested, with, or without hash?
2.  JS Module is loaded, first round routes are added, router attempts a match.


/page/#/with/hash/
router.activate()
- matched
	- 


1.  router.activate()
2.  add routes
3.  	new route --> auto .match() in constructor