# RequireJS Locate Plugin
Implements the Service Locator Pattern through the use of a RequireJS plugin. This allows the semantics of requesting
services to meld with requesting modules.

In a way, it's Dependency Injection where dependencies are injected on-the-fly with code instead of being declared through configuration.

## Usage

### Registering Services

'registry' is a reserved service name that returns the Service Registry. It has the methods `.register(name, service)` and `.unregister(name, service)`.

```js
// Locate the registry
require([ "locate!registry", "oauth" ], function (registry, oauth) {
    // Add some services to the registry

    // The one and only authentication module
    registry.register("authentication", oauth);

    // The navigation items for this app
    registry.register("navItem", { title: "Home", target: "#home", icon: "nav-icon-home" });
    registry.register("navItem", { title: "Kittens", target: "#kittens", icon: "nav-icon-kittens" });
    registry.register("navItem", { title: "Unicorns", target: "#unicorns", icon: "nav-icon-unicorns" });
});
```

### Locating Services

Prefix service names with `locate!`.

```js
// Locate a single service
require([ "locate!authentication" ], function (authentication) {
    // Use the authentication module for logging in
    // ...
});

// Locate an array of services ('service' is a fancy name for any type of data, really)
// The '?' at the end signifies that this is a query
// Zero or more items can be returned
// A filter criteria could be supplied after the '?'
require([ "locate!navItem?" ], function (navItems) {
    // Render navigation bar using items in navItems
    // ...
});
```

## License

MIT

## Todo

- Service unregisteration (but is it really needed?)
- ~~Figure out what all this means during RequireJS optimization~~
- ~~Figure out if the whole thing really has a practical application~~
