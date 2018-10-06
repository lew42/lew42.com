const socket = new WebSocket("ws://" + window.location.host);

socket.addEventListener("open", function(){
	console.log("%cdev socket connected", "color: green; font-weight: bold;");
	socket.send("connection!");
});

socket.addEventListener("message", function(e){
	if (e.data === "reload"){
		window.location.reload();
	} else {
		console.log("message from server:", e.data);
	}
});

export default socket;