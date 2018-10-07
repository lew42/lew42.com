```
	prerender_pager(){
		// this.view = div(
		// 	this.preview = div().addClass("page pager preview")
		// 		.append(this.preview.bind(this)),
		// 	this.pages = div().addClass("pages")
		// );

		this.view = div().addClass("pager").append({
			preview: this.preview.bind(this),
			pages: div()
		});

		// to maintain a consistent api between pager & page, 
		// rather than be semantically correct (nested elements vs extraneous)
		// this would also make renesting the markup easier...
		// there should be no problem boosting deeper references,
		// but I don't see a problem doing it as needed (rather than automate building them)
		/*
		I think the important part, is that there's a prescribed way.  And having this.view.sub.sub.sub makes sense, as a default.  And then
		manually elevate them (this.subsubsub);
		*/
		this.preview = this.view.preview;

		this.views.push(this.preview);

		// skips the on-demand .render() that the page's rely on
		this.rendered = true;
	}
```

We have several ways to make references:

div({ ref1: ..., ref2: ... });

div().append(
	this.ref1 = ...,
	this.ref2 = ...,
);

# Sometimes we need to boost a reference to a sub, up to the parent.

// this.preview = this.view.preview;


