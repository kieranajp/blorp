module.exports = function(app) {
    app.directive("artboard", function() {
        return {
            restrict: "E",
            templateUrl: "artboard.html"
        };
    });

    app.directive("question", function() {
        return {
            restrict: "E",
            templateUrl: "question.html"
        };
    });

    app.directive("opt", function() {
        return {
            restrict: "E",
            templateUrl: "option.html"
        };
    });

    app.directive("controls", function() {
        return {
            restrict: "E",
            templateUrl: "controls.html"
        };
    });

    return app;
};