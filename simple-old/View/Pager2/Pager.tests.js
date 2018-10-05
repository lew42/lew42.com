import Pager from "./Pager.js";
import Test, { test, assert } from "/simple/Test/Test2.js";
import View, {el, div, p} from "/simple/View/View.js";

el("style", ".pager-pages > *:not(.active) { display: none; }");

const pager = new Pager();

const pages = div(".pager-pages");

["one", "two", "three"].forEach(v => {
	const tab = el("button", v);

	const page = div(v).on("activate", () => {
		tab.addClass("active");
	}).on("deactivate", () => {
		tab.removeClass("active");
	}).appendTo(pages);


	pager.add_page(v, page);

	tab.click(() => {
		page.activate();
	});
});

pager.pages.one.activate();