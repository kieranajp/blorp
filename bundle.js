(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./controllers/Artboard":2,"./directives":3,"./factories/assessment":4,"./factories/question":5}],2:[function(require,module,exports){
module.exports = function(app) {

    function ArtboardCtrl($scope, $q, questionFactory, assessmentFactory) {
        $scope.init = function() {
            $q.all([
                assessmentFactory.loadProgress(window.pupilId),
                questionFactory.loadQuestions(window.testId),
                assessmentFactory.loadAssets(window.testId),
            ])
            .then(function() {
                questionFactory.setCurrentQuestion(assessmentFactory.getProgress());
                startSection();
            });
        };

        var startSection = function() {
            console.debug("ArtboardCtrl.startSection");
            questionFactory.getCurrentQuestion();
            console.log("start");
        };

        var endTest = function() {
            console.debug("ArtboardCtrl.endTest");
            console.log("end");
        };
    }

    app.controller("ArtboardCtrl", ["$scope", "$q", "questionFactory", "assessmentFactory", ArtboardCtrl]);

    return app;
};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
module.exports = function(app) {
    // Factory to deal with providing assessment data
    // including resuming assessments etc.
    app.factory("assessmentFactory", ["$http", "$q", function($http, $q) {
        var assessmentProgress = null;

        var AssessmentFactory = {
            loadProgress: function(pupilId) {
                console.debug("AssessmentFactory.loadProgress");
                var promise = $http.get(window.apiUrl + window.testId + "/" + pupilId);
                promise.then(function(payload) {
                    assessmentProgress = payload.data;
                }, function(error) {
                    // TODO: Implement error handler
                });
                return promise;
            },

            getProgress: function() {
                console.debug("AssessmentFactory.getProgress");
                return assessmentProgress;
            },

            loadImages: function() {
                console.debug("AssessmentFactory.loadImages");
                var promise = $http.get("/images.json");

                promise.then(function(payload) {
                    var images = [];
                    for (var i = 0; i < payload.length; ++i) {
                        images[i] = new Image();
                        images[i].src = res[i];
                    }
                });

                return promise;
            },

            loadVideo: function() {
                var wait = function() {
                    var deferred = $q.defer();
                    setTimeout(function() {
                        deferred.resolve("yes");
                    }, 2000);
                    return deferred.promise;
                };

                wait().then(function(n) { console.log(n); });
            },

            loadAudio: function() {
                var wait = function() {
                    var deferred = $q.defer();
                    setTimeout(function() {
                        deferred.resolve("yes");
                    }, 1000);
                    return deferred.promise;
                };

                wait().then(function(n) { console.log(n); });
            },

            loadAssets: function(testId) {
                console.debug("AssessmentFactory.loadAssets");

                return $q.all([
                    this.loadImages(),
                    this.loadVideo(),
                    this.loadAudio()
                ])
                .then(function() { console.log("loaded"); });
            }
        };

        return AssessmentFactory;
    }]);

    return app;
};
},{}],5:[function(require,module,exports){
module.exports = function(app) {
    // Factory to deal with providing question data
    app.factory("questionFactory", ["$http", function($http) {
        var questionList = [];
        var currentQuestionNumber = 0;
        var currentSectionNumber  = 0;

        var QuestionFactory = {
            loadQuestions: function(testId) {
                console.debug("QuestionFactory.loadQuestions");

                var promise = $http.get(window.apiUrl + testId);
                promise.then(function(payload) {
                    questionList = payload.data.data.sections;
                }, function(error) {
                    // TODO: Implement error handler
                });
                return promise;
            },

            getCurrentQuestion: function() {
                console.debug("QuestionFactory.getCurrentQuestion");

                return questionList[currentSectionNumber].questions[currentQuestionNumber];
            },

            setCurrentQuestion: function(question) {
                console.debug("QuestionFactory.setCurrentQuestion");

                var currentSection = questionList.filter(function(s, i) {
                    s.index = i;
                    return s.id === question.section_id;
                })[0];

                var currentQuestion = currentSection.questions.filter(function(q, i) {
                    q.index = i;
                    return q.item_id === question.item_id;
                })[0];

                currentSectionNumber  = currentSection.index;
                currentQuestionNumber = currentQuestion.index;

                return true;
            }
        };

        return QuestionFactory;
    }]);

    return app;
};
},{}]},{},[1]);
