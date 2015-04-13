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