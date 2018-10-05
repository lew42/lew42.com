import Tests from "/simple/Test/Tests.js";

const config = {};

export default new Test(config).add({

});


// or

export default new Test({
	imported_test,

	// just assign...
	props: 123,
	fixtures: {},
	fn_fixture(){
		return new Thing();
	},

	something(){

	},

	preview(){
		this.imported_test.preview();
		this.imported_test.run();
	}
});

/*

1. automated tests
2. test views
3. append to...?  auto append?
4. iso tests


test.render() --> renders a test page?

import "tests" from "./Class.tests.js";

tests.render().appendTo(document.body || whatever);

*/