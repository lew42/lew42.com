import View from "/simple/View/View.js";

const body = new View({ 
	el: document.body
});

window.addEventListener("resize", classify);

function classify(){
	const styles = body.styles();
	const width = parseInt(styles.width);

	if (width < 800){
		body.addClass("s").removeClass("m ml l");
	} else if (width > 1200){
		body.addClass("l").removeClass("s sm m");
	} else {
		body.addClass("sm m ml").removeClass("s l");
	}
}

// init
classify();