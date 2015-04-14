module.exports = function(app) {
    app.factory("preloadFactory", ["$q", "$timeout", function($q, $timeout) {

        var PreloadFactory = {
            loadAudio: function() {
                var deferred = $q.defer();

                $timeout(function() {
                    deferred.resolve("Audio loaded");
                }, 1000);

                return deferred.promise;
            },

            loadVideo: function() {
                var deferred = $q.defer();

                $timeout(function() {
                    deferred.resolve("Video loaded");
                }, 2500);

                return deferred.promise;
            },

            loadImages: function() {
                var deferred = $q.defer();

                $timeout(function() {
                    deferred.resolve("Images loaded");
                }, 1000);

                return deferred.promise;
            },
        };

        return PreloadFactory;

    }]);
};