module.exports = function(app) {
    // Factory to deal with providing assessment data
    // including resuming assessments etc.
    app.factory("assessmentFactory", ["$http", "$q", "preloadFactory", function($http, $q, preloadFactory) {
        var assessmentProgress = null;

        var loadAudio = function() {
            var deferred = $q.defer();

            preloadFactory
                .loadAudio()
                .then(function(d) {
                    console.debug('preloadFactory.loadAudio().then()');
                    deferred.resolve(d);
                });

            return deferred.promise;
        };

        var loadVideo = function() {
            var deferred = $q.defer();

            preloadFactory
                .loadVideo()
                .then(function(d) {
                    console.debug('preloadFactory.loadVideo().then()');
                    deferred.resolve(d);
                });

            return deferred.promise;
        };

        var loadImages = function() {
            var deferred = $q.defer();

            preloadFactory
                .loadImages()
                .then(function(d) {
                    console.debug('preloadFactory.loadImages().then()');
                    deferred.resolve(d);
                });

            return deferred.promise;
        };

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

            loadAssets: function(testId) {
                var deferred = $q.defer();

                $q.all([
                    loadAudio(),
                    loadImages(),
                    loadVideo()
                ])
                .then(function() {
                    deferred.resolve();
                });

                return deferred.promise;
            }
        };

        return AssessmentFactory;
    }]);

    return app;
};
