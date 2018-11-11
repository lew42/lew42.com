import Page from "/simple/Page2/Page2.js";
import simple, {View, el, div } from "/simple/simple.js";
View.set_captor(new View({ el: document.body, capturable: false }));

const page = new Page({
	name: "Root"
});

/*

page.add("one", one => {
	one.add("one_a", one_a => {
		
	});

	one.add({
		one_b(one_b){
			
		},
		one_c(){
			this.add("one_c_1", ...)
		}
	});

});

*/

page.view = div().addClass("pager").append({
	pages: div()
});

console.log(page.view.pages);

page.add("one", function(){
	div("one content");
	
	this.add({
		one_1(){
			div("one_1 content?")
		},
		one_2(){
			div("one_2 content");

			this.add({
				one_2_1(){
					div("one_2_1 content");
				}
			})
		}
	})
});

page.add("two", function(){
	div("this is page 2?");
});


// page.render().appendTo(document.body);


// // post content function?
// export default post => {
// 	h1();
// 	p();
// };


// export default new Post({
// 	title: "This is my First Post",
// 	content(){

// 	}, 
// 	content, // imported, predefined, or hoisted
// });

// function content(){

// }

// and in index.js:

// import some_post from "./some-post.js";

// lew42.page(some_post.single());

// lew42.append(some_post.single());

// lew42.app.append(some_post.single());

// lew42.main.append(some_post.single()); // won't be captured...

// or

// lew42.main(() => {
// 	some_post.single();
// });


/*

export default new Post(); // one of the most basic things you can do...  create a cached instance





lew42.com/templates/
lew42.com/views/
	Shared views, like the navbar, that import various things, and publish reusable view instances.


Should something like the nav be a class or an instance?
If it's an instance, you can only make one, unless you 


You might want to render a list of posts[]... in multiple ways

You might want to render a custom view (access the properties directly, creating a whole new template)

post.render();
post.list();
post.list_small();
post.single(); // ? aka .render() ?
	// renders the whole nav bar, and everything?



lew42.com/theme/theme.js
// imports and exports all the header, nav, footer, etc...

or 
lew42.com/ui/

but, there's a difference between the templates and the instances.  In the end, we want to use the same instance of the 


Everything is a function?

export default function(){
	// content?  or create a new Post?

	return new Post();
}

export default () => new Post({
	
}); // then it doesn't get cached/reexported...



/some-post/some-post.js

import lew42 from "/lew42.js";

export default lew42.post(post => {
	// content?
});

export default new lew42.Post({
	title: "Some Post", // auto_slug() => some-post, auto_name() => some_post
		// automatically used for h1
	content(){
		View.catch("./content.js");
			// registers current captor to recieve everything captured in the next request?
			// this is dangerous, if any other view code is running - it will capture in the wrong spot..
		
	}
})


Page sounds more like... an arbitrarily purposed /path/ real index.html

Post sounds more like... some arbitrary piece of content.

/some-post/content.js
/some-post/index.js:

import content from "./content.js";

export new Post({
	render(){
		// auto render?
		// default function:
		auto append to ...?
		auto-render and get captured?
	}
	content
})



import some_post from "/some-post/some-post.js";

some_post.render()?

Wouldn't it be easier to just use 1 root route, and all /#/hash/paths/ ?

lew42.com/simple/
lew42.com/#/all/others/
// but only if we can request/catch?

That means we must make a new Post()...

export default new Post();

and be able to catch it...?


Unless, if we're creating a dynamic module, and appending it to the page...
We could just append a dynamic module that imports AND appends it...

import some_post from "/posts/some_post.js";
simple.posts.add(some_post);



const page = new Page({
	title: "Title of the Post"
})

simple.page();

const page = simple.page.bind(simple);

==> lew42.page(// content here?)

You can't add content AND config...

new lew42.Page({ config }).append()

new lew42.Page({
	config,
	content(){
		//...
	}
})


new Page(page => {
	// called immediately, render page here?
});

or

const page = new Page();

// render page here..?

function content(){
	page.meta({})
}


Page/Router implementations
- Tests
- Tabs
- Explorer
- Explorer w/ breadcrumbs
- Breadcrumbs only

new Tabs().add({
	tab_route1(){
		// content
	},
	tab_route2(){
		// content
	}
});

or

const tabs = new Tabs();

tabs.add("tab_1", tab_1 => {
	
});


But, let's say you're creating a few pages:

new Page().add({
	one(){
		
		new Tabs().add({
			one(){
				// 4 tabs?
				// I suppose there aren't really any solutions, besides using functions to break it down

			}
		});

	}
});

new Page().add({ 

one(){
	// one tab, instead of 2
}, 

two(){
	the route gets a little buried but i think it's ok
} })




How about for styling/tpl?

No need for classify()?  When you click on a tpl, it (may) have sub tpl?

tpl(t => {
	h1(...)
	t.intro = p().filler(2-4s);
}).fork({
	one(t){
		t.addClass();
		t.h1.addClass() ?
	},
	two(t){
		
	}
}).fork("one", t => {
	
}); // returns the fork, or the original?

const thing = tpl(thing => {
	
});

const thing2 = thing.fork(thing2 => {
	
});


function thing(){
	h1(...);
	p(...);
}

function thing2(){
	return div(h1(...), p(...));
}

function thing3(){
	return thing2().addClass("thing3");
}

function thing4(){
	return cls("one two", 
		h1(...),
		p(...)
	);
}

export default function(){
	
}


*/