import View, { el, div, p } from "/simple/View/View.js";
import { icon } from "/simple/View/Icon/Icon.js";

export default function(){

	div(".section1.pp2.well1",
		div(".content-squeeze", 
			p().filler("3-5s"),
			p().filler("3-5s"),
			div(".item1", ".item1"),
		),
		div(".item1.content-squeeze", ".item1.content-squeeze"),
		div(".item1.content-squeeze.pad0.pp.pp1", 
			p().filler("2-3s"),
			div(".full.full2").filler("2s"),
			p().filler("2-3s")
		),
	);

	div(".section2.pp1", 
		div(".item1.full", ".item1.full"),
		div(".item1", ".item1"),
		div(".item1", ".item1"),
		div(".item1.full", ".item1.full"),
		div(".item1.full", ".item1.full"),
		div(".item1", ".item1"),
		div(".item1", ".item1"),
		div(".item1.full", ".item1.full"),
	);

	div(".section1.pp1.well1", 
		div(".item1", ".item1"),
		div(".item1.item1-2", icon("beer"), div("", ".item1-2")),
		div(".full.full1", ".full1"),
		p().filler("3-5s"),
		p().filler("3-5s"),
	);
}