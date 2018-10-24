import Storage from "../Storage/Storage.js";

export default class Dev {

	constructor(){
		this.storage = new Storage("dev");

		if (this.storage.get("livereload"))
			this.connect();
	}

	connect(){
		this.socket = new WebSocket("ws://" + window.location.host);

		this.socket.addEventListener("open", function(){
			console.log("%csimple.dev.socket connected", "color: green; font-weight: bold;");
			socket.send("connection!");
		});

		this.socket.addEventListener("message", function(e){
			if (e.data === "reload"){
				window.location.reload();
			} else {
				console.log("message from server:", e.data);
			}
		});

		this.storage.set("livereload", true);

		return socket;
	}

	reset(){
		this.storage.set("livereload", false);
		window.location.reload();
	}
}