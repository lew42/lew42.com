/*

route.add("new", {...});
// great, simple...
// auto-match upon instantiation



Objective: abstract the hash management away from the Router, so I can make 2 routers with the same underlying .hashpath

HashPath doesn't care about who is active?


How does the HashPath interface with routes, for example?

router.add("my_route", route => {
	// activate
});

hashpath.on("some/hash_path/here", () => ??)

What about sequential activation/deactivation?





Extend HashPath to add functionality (as opposed to events)?

Match on init?  What about the back button?
If, at some point, the back button is pressed - we (may) have no idea which route we're going to.
In this case, we need to rematch.  And in this case, all the sub routes may already exist.  In which case, we need to rematch, and... reset the remainder thingy?

We may activate a virgin route.  But we may activate a previously activated route.

Shouldn't "initialize" be a one-time thing?  Like, if !this.initialized, this.initialize() --> this.render()

rematch(){
	if (this.is_match()){
		this.activate();
		if (this.children)
			this.chilldren.each(child => child.rematch());
	}
}

hash.change => router.rematch() => tries to 
*/


class Path {

}

/*

1.  create Path objects independently of actual path
2.  create URLHash to manage the url's hash?

*/

class HashPath extends Path {
	constructor(){
		this.parts = window.location.hash.slice(2, -1).replace(/-/g, "_").split("/");

	}
}


/*

Sequential matching:
> start with first /#/first/hash/part/
> track which part you're on
> activate each path/route as they match
> allows new sub paths to be added dynamically
> rematch upon init of new path/route

*/