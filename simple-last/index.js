// import simple, { el, h3 } from "/simple/simple.js";
// import simple, { View, el, div, p, h1, h2, h3 } from "/simple/simple.js";

// window.simple = simple;

// simple.body.append("hello world");

// el("input").attr("placeholder", "hello");

(async () => {
	const mod = await import("/simple/simple.js");

	console.log(mod.h3);
})();