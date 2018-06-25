const express = require("express");
const chokidar = require("chokidar");
const WebSocket = require("ws");
const http = require("http");
const app = express();
const sites = [ "simple" ];

for (const site of sites){
	app.use("/"+site+"/", express.static(__dirname + "/"+site));
}

app.use(express.static(__dirname + "/lew42.github.io"));

const server = http.createServer(app);
const wss = new WebSocket.Server({
	perMessageDeflate: false,
	server: server
});

var connection_count = 0;

wss.on("connection", function(ws){
	console.log("connected", ++connection_count);
	// console.log(ws);
	// console.log(ws._socket);

	// service(ws);

	chokidar.watch(sites.map(site => "./" + site).concat([
			"./lew42.github.io",
			"!**/*.css",
			"!**/.git"
		])).on("change", (e) => {
		console.log(e, "changed, sending reload message");
		ws.send("reload", (err) => {
			if (err) console.log("livereload transmit error");
			else console.log("reload message sent");
		});
	});
});

server.listen(80, function(){
	console.log("Listening..");
});