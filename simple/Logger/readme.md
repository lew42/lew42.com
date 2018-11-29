# Requirements

- Add log statements, and toggle them easily (without having to rewrite code)
- Ability to turn off proxying entirely, to avoid complications/confusion
- Ability to add notes to the log, and they only appear in dev mode...




## Organization

How do we get to the logs?
How do they show everything?

Basically, all the files that run should appear...

But this might not be so easy at first.
It should be as automatic as possible...

-> Organized by class
	Toggle logging by class, in-browser, via UI

See new instances by class?
Yes, browse instances by class...

But, we're probably more concerned with the chronological log.

use class.name to lowercase as the default obj name?

class Thing {} --> thing.whatever()

and maybe even track them?

thing42.whatever()
// just put the id after the thing, regardless of what it's labelled as in the script?


We basically want a filterable log..

Each instance can have its own log
	Click to switch to the instance view, to view the chron view of only that instance

Each class can have its own creation log...

And the global log
- probably ignores the loading/defining of base classes (although this would be helpful to see everything in a comprehensive debugging ui)

Do we show object context?

If one log is a .method() and the next is another .method2() by the same obj, should they be grouped?