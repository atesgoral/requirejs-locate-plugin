require.config({
    paths: {
        locate: "../locate"
    }
});

// "registry" is a reserved resource name that returns the registry
define([ "locate!registry" ], function (registry) {
    // Register some apples
    registry.register("apple", "golden");
    registry.register("apple", "red delicious");
    registry.register("apple", "green");

    // Register a basket
    registry.register("basket", { contents: [] });
    // Registering a second basket will cause an error since a single basket is expected below
    //registry.register("basket", { contents: [] });

    // Locate all apples and a basket
    // A ? at the end implies we want an array of services
    require([ "locate!apple?", "locate!basket" ], function (apples, basket) {
        Array.prototype.push.apply(basket.contents, apples);

        // The basket should contain all apples
        console.dir(apples);
        // The basket should contain all apples
        console.dir(basket);
    });
});
