module.exports = function(app) {

    function ArtboardCtrl($scope, $q, questionFactory, assessmentFactory) {
        $scope.init = function() {
            $q.all([
                assessmentFactory.loadProgress(window.pupilId),
                questionFactory.loadQuestions(window.testId),
                assessmentFactory.loadAssets(),
            ])
            .then(function() {
                console.debug("init.then");
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