import View, { el, div } from "../View.js";
import Test, { test, assert } from "../../Test/Test.js";
import Item, { item } from "./Item.js";
import Icon, { icon } from "../Icon/Icon.js";

import importedItem from "./item-import-test.js";

View.app.addClass("old");

test("inline-block flex", t => {
	div("Lorem ipsum dolor set ", div(".ib", div(".flex", icon("beer"), div("amet"))), " adipiscing elit.")
});

class IconItem extends Item {
	content(){
		this.icon = icon(this.icon || "beer");
		this.label = div(".label", this.label || "temp label");
	}
}

IconItem.prototype.classes = "item icon-item";

const icon_item = function(icon, label){
	return new IconItem({ icon, label })
};

const icon_item2 = function(i, label){
	return div(".flex.pad-c", {
		icon: icon(i),
		label
	});
}

const icon_item_action = function(i, label, action){
	return div(".flex.pad-c", {
		icon: icon(i),
		label: div({
			title: label,
			action: icon(action).addClass("flex-push")
		}).addClass("flex flex-grow pad-c")
	});
}

const icon_item_primary_secondary = function(i, label, primary, secondary){
	return div(".flex.pad-c", {
		icon: icon(i),
		label: div({
			title: label,
			primary: icon(primary).addClass("flex-push")
		}).addClass("flex flex-grow pad-c"),
		secondary: icon(secondary) 
	});
};

function item1(...args){
	return div(".item1").append(...args);
}

function xtest(){}

xtest("things", t => {
	thing("thing", ".opt.class.es", { // .thing
		sub: "sub", // .thing--sub
		things: "things", // .thing--things
		children: { // .thing--children
			subsub: "subsub" // .thing--subsub
		}
	});

	/* no matter the nesting depth, a "thing"? component?, or whatever adopt the things as properties at the root level.

	this solves the referencing/promotion problem.

	this also solves the re-nesting problem (if you need to reposition an element within a component, you don't have to worry about getting.the.proper.path 

	this also solves the problem of leaky CSS (having to use .parent > .preview > .thing, direct descendant selectors to make sure you're not cascading onto all children), which is essentially the BEM approach..

	this could also be the foundation for the auto-fork iteration technique:

	any "thing" could be auto-forked, where it gets a unique classname (like .thing_v2), so that you can immediately start adding styles to that classname.  you could add css classes, to mixin preexisting styles, but those won't save as easily... */
});

function expandable(title){
	return div(".expandable.card", {
		preview: div(".wrap.flex.sep-all-c", {
			icon: icon("beer"),
			label: div(".item-label.flex-grow.flex.pad-c.wrap", {
				title: div(".flex-grow", title || "this is the title"),
				primary: icon("plus")
			}),
			btns: div(".pad-c.flex.wrap", icon("arrow-right"))
		}),
		reveal: div(".wrap.pad-c.sep-all-c", {
			body: "this is the body",
			footer: "this is the footer"
		}).hide()
	}, self => {
		self.preview.label.click(l => {
			self.reveal.toggle();
		});
	}).css("display", "block");
}

test("nesting", t => {
	t.view.content.addClass("grad-1").css("color", "white");
	el("h1", "Something Important");
	// el("p", "Lorem ipsum yadda yadda.");
	div(".grid.two", {
		left(){
			expandable().addClass("expandable-alpha");
		},

		right: div(".pad", "Lorem ipsum dolor sit amet adipiscing elit.")
	});
});

test("expandables, squished", t => {
	// t.view.addClass("wires").content.addClass("items paper");
	t.view.content.addClass("well squish-c card-stack");
	div(".card-stack", 
		expandable().addClass("expandable-alpha"),
		expandable("another").addClass("expandable-alpha"),
		expandable("third").addClass("expandable-alpha")
	);
});

test("expandable", t => {
	// t.view.addClass("wires").content.addClass("items paper");
	t.view.content.addClass("well");
	expandable().addClass("expandable-alpha");
	expandable("another").addClass("expandable-alpha");
	expandable("third").addClass("expandable-alpha");
});

test("item1", t => {
	t.view.addClass("wires").content.addClass("items paper");
	div(".item.item1", ".item.item1");
	div(".item.item1.item1a", div("", ".item1.item1a"), div("two"));
	div(".item.item2", div("", ".item.item2"), div("yo"));
	div(".item.item2", icon("beer"), div("", ".item.item2"), div("yo"));
	div(".item.item2", {
		icon: icon("beer"),
		label: {
			title: "this is the title",
			primary: icon("calendar")
		},
		btn: icon("plane")
	});
	div(".item.item2.pad", "yo");
	div(".item.item2", "yo");
	div(".item.item2", {
		icon: icon("cube"),
		title: "test label"
	})
});

test("icon item primary, secondary", t => {
	t.view.addClass("wires");
	icon_item_primary_secondary("beer", "plane", "plus", "arrow-right");
});

test("icon action item", t => {
	t.view.addClass("wires");
	icon_item_action("plane", "beer", "cubes");
});

test("icon item", t => {
	t.view.addClass("wires");
	icon_item2("calendar", "Calendar");
	icon_item2("cubes", "Modules");
});

test("wires", t => {
	t.view.addClass("wires");
	div("yo");
	div("yo");
});

test("css vars", t => {
	div(".b", ".b");
});

test("borders", t => {
	item("yo").addClass("pad border-bevel bg-green-1");
	item(div("yoyo yo"), div("yo"), div("yo")).addClass("flex pad-c sep-h-c border-bevel bg-green-1");
});

test("backgrounds", t=>{
	item("yo");
});

test("transparent", t => {
	t.view.content.addClass("grad-1");

	icon_item2("bookmark", "tranny");
});

test("colored", t => {
	div(".block.bevel", 
		div(".green.header.item.flex.pad-c", {
			icon: icon("file").addClass("shade"),
			label: "label here",
			btn: icon("caret-right").addClass("flex-push shade")
		}),
		div(".content", "content")
	);	

	div(".block", 
		div(".header.item.flex.pad-c", {
			icon: icon("file").addClass("shade"),
			label: "label here",
			btn: icon("caret-right")
		}),
		div(".content", "content")
	);
});

test("hmm", t => {
	t.view.addClass("wires").bar.append(div(".wires", ".wires").click(btn => {
		t.view.toggleClass("wires");
	}));
	div(".item.flex.pad-c", {
		icon: icon("caret-square-up").addClass("shade-1"),
		label: "the label"
	})
});

test("grid", t => {
	div(".grid.two", {
		left: "left",
		right(){
			icon_item("grin-beam", "item title").append({
				content: "some content"
			});
		}
	});
});

test("stack", t => {
	t.view.content.addClass("items separated")
	icon_item("calendar", "Calendar");
	icon_item("paper-plane", "Projects");
	icon_item("chart-bar", "Analytics");
});

test("link", t => {
	el("a.test-link", icon_item("folder", "sub")).attr("href", "sub/");
});

test("icon list", t => {
	t.view.content.addClass("flex");
	const icons = ["address-book", "address-card", "angry", "arrow-alt-circle-down", "arrow-alt-circle-left", "arrow-alt-circle-right", "arrow-alt-circle-up", "bell", "bell-slash", "bookmark", "building", "calendar", "calendar-alt", "calendar-check", "calendar-minus", "calendar-plus", "calendar-times", "caret-square-down", "caret-square-left", "caret-square-right", "caret-square-up", "chart-bar", "check-circle", "check-square", "circle", "clipboard", "clock", "clone", "closed-captioning", "comment", "comment-alt", "comment-dots", "comments", "compass", "copy", "copyright", "credit-card", "dizzy", "dot-circle", "edit", "envelope", "envelope-open", "eye", "eye-slash", "file", "file-alt", "file-archive", "file-audio", "file-code", "file-excel", "file-image", "file-pdf", "file-powerpoint", "file-video", "file-word", "flag", "flushed", "folder", "folder-open", "font-awesome-logo-full", "frown", "frown-open", "futbol", "gem", "grimace", "grin", "grin-alt", "grin-beam", "grin-beam-sweat", "grin-hearts", "grin-squint", "grin-squint-tears", "grin-stars", "grin-tears", "grin-tongue", "grin-tongue-squint", "grin-tongue-wink", "grin-wink", "hand-lizard", "hand-paper", "hand-peace", "hand-point-down", "hand-point-left", "hand-point-right", "hand-point-up", "hand-pointer", "hand-rock", "hand-scissors", "hand-spock", "handshake", "hdd", "heart", "hospital", "hourglass", "id-badge", "id-card", "image", "images", "keyboard", "kiss",
		"kiss-beam", "kiss-wink-heart", "laugh", "laugh-beam", "laugh-squint", "laugh-wink", "lemon", "life-ring", "lightbulb", "list-alt", "map", "meh", "meh-blank", "meh-rolling-eyes", "minus-square", "money-bill-alt", "moon", "newspaper", "object-group", "object-ungroup", "paper-plane", "pause-circle", "play-circle", "plus-square", "question-circle", "registered", "sad-cry", "sad-tear", "save", "share-square", "smile", "smile-beam", "smile-wink", "snowflake", "square", "star", "star-half", "sticky-note", "stop-circle", "sun", "surprise", "thumbs-down", "thumbs-up", "times-circle"]
	for (const i of icons){
		icon_item(i, i);
	}
});

test("extend", t => {

	icon_item("beer", "plane").on("click", ii => {
		ii.icon.icon("plane");
		ii.label.reset("beer");
	});
});

test("icon item", t => {
	item(icon("beer"), "hello world");
});

test("item", t => {
	console.log(item("hello world").name);
	item(); // empty
});

test("montserrat", t=> {
	// t.view.addClass("ff-montserrat");
	item("plain");
	item(".ff-montserrat").addClass("ff-montserrat");
	item(".fs-75").addClass("fs-75");
	item(".fs-75.ff-montserrat").addClass("fs-75 ff-montserrat");
});

test("dark", t => {
	t.view.addClass("dark ff-montserrat");
	item("hello world");
});

test("fonts", t => {
	item("verdana").addClass("ff-verdana");
	item("tahoma").addClass("ff-tahoma");
})

test("import", t => {
	t.view.content.append(importedItem);
});

test("columnar", t => {
	div(".two.cols.style-85", {
		left(){
			item("left side");
		},

		right(){
			this.css("background", "red");
			this.append("needs content");
		}
	})
});