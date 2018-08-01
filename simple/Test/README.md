Test x Router
Each test's name becomes its route path.  But how do you nest them?

A default router?  Test.prototype.router = new Router();
And then if a test has added tests, then we override the test.router?

Or, we use a Test.router, to be the root path.
And each Test gets its own .route equal to its name.
And if each route is initialized independently, then we only initialize the route when we try to run the test.


Should tests auto-run if their route is matched?
Or, tests must be rendered to initialize routing?
You'd basically render all the tests, which activates the route, and if the route matches, then they'll run, otherwise they're skipped.  But either way, their presence is rendered, so you can click it.


Allow lazy loading of test?  test.load("./import-path.js");
	// sets this test as captor indefinitely? or for one new Test()?


test.run() // => returns a report
test.render() // => creates a view, and calls .run() within the view


test("name", t => {
	// auto render?
});

if these are captured by the current View.captor...?
Also, can you collect/group these named tests, and add them to another test suite?
You could convert them to named tests...

==>  new Test().add({
	name(){
		// put code here
	}
});


or just 

test("name", t => {}); // to
new Test("name", t => {});




export default function(){
	...
}

import something from "./something.js";

something(); // just run the fn

new Test({
	something, // add as fixture
}).add({
	something, // add to .tests
})



export default new Test("something", t => {
	
});




REquirements

- encapsulate and export tests
- optional render (automated testing vs dev views)
- minimal re-writing


Single Test vs Tests (pager):

Simplest: just override .render to use a TestPager?


const tests = new Tests({});

export default tests;

const test = tests.test.bind(tests);

test("name", t => {
	t == this && t instanceof tests?
});




export default new Tests().test({
	named
});


export default new Tests().add(t => {
	// one
}, t => {
	// two
}, t => {
	// three
})



export default new Tests({
	simple: {
		one(){
			return something;
		}
	}
}).add(t => {
	t.simple.one();
});




simple.test(...args){
	return new Tests().test(...args);
};



new Tests({
	fixtures
}).test("name", t => {
	
})

remove auto-run, and manually exec?

1. import sub from "./sub.js";

new Test({
	2) sub,
	3) run(){
		this.sub();
	}
});

3 step: import, assign, run

So, it would make sense to track them..

new Test({
	
}).add({
	sub
});


const t = new Test();

export default t;

const test = t.add.bind(t);

test({
	named, tests
});

test(anon, fns) // use fn.name

test("name", t => {});