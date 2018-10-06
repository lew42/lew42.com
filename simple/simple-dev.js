import simple, { View, el, div, p, h1, h2, h3 } from "/simple/simple.js";
import dev from "/simple/dev/dev.js";

simple.dev = dev;

export default simple;
export { dev, el, div, p, h1, h2, h3, View };

/*

We need a dev.js and a prod.js that aren't directly loaded.

Upon committing, we copy prod.js into the env.js file, which is always loaded.
Upon checking out, or starting the dev server, we copy dev.js into the env.js file.

*/