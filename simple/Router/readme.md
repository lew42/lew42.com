Router variants:

Are all routes defined before matching?
Will we activate sub routes between the initial page load and the end route?
Can we rely on lazy routes?
	Basically, no sub routes are added until it is activated (rendered).
	This means we'll never have a sub route activated without its parent being activated/rendered first, which is handy.