# File System Storage Structures

A file is just a string.  We'll assume utf-8 encoding, and json or xml structure?

## Directory replaces the concept of a "File"

Any "thing" can be a directory, and have visible components (actual sub dir and files).



thing/
	sub-thing/
	config.json
	package.json
	meta.json
	dir.json
	...














Maybe we can have alternate encodings?
- store data more reliably?
- but how do you have database-like storage with the file system?
- that actually shouldn't be terribly hard...
- it might require a certain degree of indexing, etc.