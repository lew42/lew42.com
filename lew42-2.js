import Lew42 from "/modules/Lew42/Lew42.js";
import View, { el, div, h1, h2, h3, p } from "/simple/View/View.js";

function capitalize(str){
	return str.split(" ")
			.map(word => word[0].toUpperCase() + word.slice(1))
			.join(" ");
	}

function entitle(view, amount){
	view.filler(amount || "2-6w");
	view.reset(capitalize(view.value()));
	return view;
}

function content(){
	entitle(h3());
	this.filler("1-3p");
}

const lew42 = window.lew42 = new Lew42({
	capitalize(str){
		return str.split(" ")
			.map(word => word[0].toUpperCase() + word.slice(1))
			.join(" ");
	},

	content(lew42, view){
		div.c("left", left => {
			div.c("paper1 section-dbox", paper => {
				h2("Decision Box");
				div.c("options-wrap", wrap => {
					div.c("box1 bg-eee active pad-a", box => {
						h3("FIRST")
					});
					
				});
			});
			div.c("paper1", paper => {
				h2("Let's try a flush right?")
				p("How about 1 col -> 2 col.  Plus an active effect.")
			});
			div.c("paper1", paper => {
				h2("Let's try a 2 col?")
			});
			lew42.div.c("paper1", paper => {
				lew42.h1("Hello World");
				paper.filler("1p");
				lew42.div.c("full bg-eee", "full content");
				paper.filler("2p");
				lew42.div.c("layout-pad-a bg-eee", lew42.h2("Content Box")).filler("2p").append(lew42.div.c("full bg-444 color-fff", content)).filler("1-4p");
				paper.filler("2p");


			});
			lew42.div.c("paper1", paper => {
				lew42.h1("Hello World");
				paper.filler("1p");
				lew42.div.c("full bg-eee", "full content");
				paper.filler("2p");
			});
		});

		div.c("right", right => {
			div.c("inner bg-eee active", inner => {
				h2("Animate this overlay")
				h2("Needs to be position: fixed")
				h2("Has its own scrollbar")
			}).filler("2-4p");
		});
	}
});

export default lew42;
export * from "/modules/Lew42/Lew42.js";