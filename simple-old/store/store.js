import { is } from "/simple/util.js";

export default function store(key, value){
	if (is.def(value)){
		if (!is.obj(value))
			throw "only store objects please";

		return localStorage.setItem(key, JSON.stringify(value));
	} else {
		return JSON.parse(localStorage.getItem(key)) || {};
	}

}