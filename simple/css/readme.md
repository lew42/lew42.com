Notes about automating css branching:

# Override classes such as .wrap or .flex are handy, but if you're trying to override something like:

    .pager > .tabs > .tab {}

you'll need to define override classes like this:

	.wrap.wrap.wrap.wrap {}

Which isn't really a problem...  But...

# .these > .direct > .selectors > .are > .rigid {}

If you ever want to re-nest, you have to edit your css.

However, the optimal solution looks something like this:

	.pager {}
	.pager_tabs {}
	.pager_tab {}
	.pager_pages {}
	.pager_page {}

	.pager2 {}
	.pager2_tabs {}
	.pager2_tab {}
	...

Which is sort of like BEM - using single selectors.  It's just kind of a PITA to add them all.

If you want to "fork" your component to add a new version, you have to manually add all the classes with a new `comp#_` prefix baked in?

Or, you need some sort of complex naming system which could allow you to do this:

	new Pager().v(2, 8, "3c");

Where these are independent mixins.

	v(...args){
		// todo: add_page needs to add these versions...
		// todo: what about remove versions?
		// this should wait until I have a working evented collection that can automatically add/remove as necessary
		this.vs = this.vs || [];
		this.vs.concat(args);

		for (const v of args){
			this.addClass("pager" + v);
			this.$tabs.addClass("pager" + v + "_tabs");
			this.$pages.addClass("pager" + v + "_pages");

			for (const page of this.pages){
				page.view.addClass("pager" + v + "_page");
				page.tab.addClass("pager" + v + "_tab");
			}
		}
	}

However, you have to track all these versions, and add them to new incoming pages also, which gets a little tricky.

Keeping lists in sync is better suited for something like an evented collection.

# Until then, just use > direct > descendent > selectors

This isn't a perfect solution, but for the time being is probably best...