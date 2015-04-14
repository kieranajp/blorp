module.exports = function(app) {
    app.directive("artboard", function() {
        return {
            restrict: "E",
            templateUrl: "templates/artboard.html"
        };
    });

    app.directive("question", function() {
        return {
            restrict: "E",
            templateUrl: "templates/question.html"
        };
    });

    app.directive("opt", function() {
        return {
            restrict: "E",
            templateUrl: "templates/option.html"
        };
    });

    app.directive("controls", function() {
        return {
            restrict: "E",
            templateUrl: "templates/controls.html"
        };
    });

    return app;
};