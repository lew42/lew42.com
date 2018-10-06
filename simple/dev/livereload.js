export const server = new WebSocket("ws://" + window.location.host);

server.addEventListener("open", function(){
	console.log("%cserver connected", "color: green");
	server.send("connection!");
});

server.addEventListener("message", function(e){
	if (e.data === "reload"){
		window.location.reload();
	} else {
		console.log("message from server:", e.data);
	}
});

server.obj = function(obj){
	server.send(JSON.stringify(obj));
};