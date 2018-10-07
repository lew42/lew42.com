new Test({
	run(){
		// empty, put code here?
	}
});

test("name?", t => {
	
});

test.add() is necessary - for routing.

routing is necessary for isolation, which helps with:
- dev --> live reload --> keeping focus/state
- isolating console.log, bugs, amount of code (helps focus on the problem)
- maximizing a layout/view

Nested tests?

Why not just stick to object oriented tests, rather than capture groups and shit (much harder for routing)...?

Ultimately, we want to be able to customize the views..
- List?
- Custom preview -> full view?

.meta() view:  Used in conjunction with the .master() or .main()?

.preview(): As it sounds, it appears BEFORE, and is replaced by the .full() view...

I think any content needs to choose between:

preview --> full
 
OR

meta (as a tab) --> complementary main view (simultaneous)
or
meta (as an expando preview) --> complementary content