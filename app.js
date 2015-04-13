(function() {
    "use strict";

    // Variables to be set by the server (via templating language)
    window.apiUrl  = "http://localhost:3000/";
    window.testId  = 1;
    window.pupilId = 1;
    // console.debug = function() {}; // Uncomment to disable debug statements

    // Create & configure our module
    var app = angular.module("baselineApp", []);

    require("./directives")(app);

    require("./factories/question")(app);
    require("./factories/assessment")(app);

    require("./controllers/Artboard")(app);
})();