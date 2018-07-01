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