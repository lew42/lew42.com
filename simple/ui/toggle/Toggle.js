class Toggle extends View {
	activate(){
		this.addClass("active");
	}

	deactivate(){
		this.removeClass("active");
	}
}