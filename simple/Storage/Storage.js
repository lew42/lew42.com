import is from "../is/is.js";

export default class Storage {
	constructor(id){
		if (is.str(id) || is.num(id))
			this.id = id;
		else
			Object.assign(this, ...arguments);
		
		this.load();
	}

	load(){
		if (!this.id)
			throw "must provide storage.id";

		this.data = JSON.parse(localStorage.getItem(this.id)) || {};
	}

	save(){
		localStorage.setItem(this.id, JSON.stringify(this.data));
		return this;
	}

	get(n){
		return this.data[n];
	}

	set(n, v){
		if (is.obj(n))
			Object.assign(this.data, n);
		else
			this.data[n] = v;

		this.save();
		return this;
	}
}

/*

const storage = new Storage("storage_id");

storage.get("prop1")
storage.get("prop2")

storage.set("prop3", { one: 1, two: 2 });

*/