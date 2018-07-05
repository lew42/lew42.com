import View from "/simple/View/View.js";

window.addEventListener("resize", classify);

function classify(){
	const styles = View.body.styles();
	const width = parseInt(styles.width);

	if (width < 800){
		View.body.addClass("s").removeClass("m ml l");
	} else if (width > 1200){
		View.body.addClass("l").removeClass("s sm m");
	} else {
		View.body.addClass("sm m ml").removeClass("s l");
	}
}

// init
classify();