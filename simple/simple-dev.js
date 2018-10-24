import simple, { View, el, div, p, h1, h2, h3 } from "/simple/simple.js";
import dev from "/simple/dev/dev.js";

simple.dev = dev;

export default simple;
export { dev, el, div, p, h1, h2, h3, View };

/*

We need a dev.js and a prod.js that aren't directly loaded.

Upon committing, we copy prod.js into the env.js file, which is always loaded.
Upon checking out, or starting the dev server, we copy dev.js into the env.js file.

???

You could manually change env.js from
import "./prod.js";
to
import "./dev.js"

and back... (before publish)


OR

You could look for a cookie that's been turned on, which will lazy load the dev environment?

This way, you don't have to worry about commit scripts...


BUUUUT,  we'll need commit scripts at some point...
console -> simple.dev(){
	connects to reload server
	saves a cookie to auto-connect
}

Ahh, yes - we can load the dev.js, just don't always try and connect...

*/