Why aren't any of these files saving?

# Panels

Basically, a slight extension of the concept of a View.  Panels should be highly configurable.  And maybe have more of a "plugin" system, for dynamic functionality?  Maybe we need to have module events, for that...

Columns, Drag and Drop, Configurable CSS, Menus, Drawers, etc...

Modular views:  Instead of operating on a new .el, they could operate on another view.  You'd basically just need an .install(view) method, to kick everything off.

Or even just the constructor:  columns(this); ==> creates a new Columns instance, takes `this` as the target.

* Configurable Layouts

localStorage is probably enough to prevent loss of work, and give you enough time to export to file.  And linking that together with the server to do it automatically isn't particularly any harder...

