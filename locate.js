/*!
 * @license RequireJS Locate Plugin, Copyright (c) 2013 Ates Goral
 * @version 0.0.1
 * Implements the Service Locator pattern through a RequireJS plugin
 */
define(function () {
    "use strict";

    var registry = {};

    return {
        load: function (name, req, onload, config) {
            if (name === "registry") {
                return onload({
                    register: function (name, service) {
                        var services = registry[name] || (registry[name] = []);
                        services.push(service);
                        return this; // todo: or return an unregister handle?
                    },
                    unregister: function (name, service) {
                        // todo
                    }
                });
            }

            var tokens = name.split("?"),
                services;

            if (tokens.length === 1) {
                services = registry[name];

                if (services.length === 1) {
                    onload(services[0]);
                } else {
                    var err = new Error("Exactly one service instance expected");
                    err.locateServiceName = name;
                    err.locateActualCount = services.length;
                    onload.error(err);
                }
            } else {
                services = registry[tokens[0]];
                // todo: add filtering by query in tokens[1]
                onload(services);
            }
        }
    };
});
