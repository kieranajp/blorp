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