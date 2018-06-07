export default function mixin(cls, ...mixins){
	Object.assign(cls.prototype, ...mixins);
	return cls;
};

mixin.assign = {
	assign(...args){
		return Object.assign(this, ...args);
	}
};