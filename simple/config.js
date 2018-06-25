import store from "/simple/store/store.js";

/*
You can't have an optional import...
If you want to have config at the site level, you'll need to manually import your own config, and app.config({site-level cconfig})

Also, config UI?
*/

const config = {
	env: "dev"
};

Object.assign(config, store(""))

if (config.env === "dev"){
	el("script").attr("src", "/simple/dev/dev.js").attr("type", "module").appendTo(document.head);
}


export default {
	env: "dev"
}