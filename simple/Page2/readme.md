# Tests, Pagers, Pages, etc...

new Test({
	base(){
		return div("hello");
	},
	// preview auto wraps the base in a little frame
	iso(){
		this.preview();
		this.notes();
		this.versions();
	}
}).v(2, v2 => {
	
});