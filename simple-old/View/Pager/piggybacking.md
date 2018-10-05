new View({
	el: another.el
});

This works, and is kinda handy for modular view logic.  However, the one caveat is that if you do something like this internally, like I am for Pager logic...

pager.add({
	name: view
});

This will use the view.el as the page.el...

You might think that the view IS the page... but clearly we're not going to add the page API to the view 