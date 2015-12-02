angular.module('de.codearcs.website')
    .service('RandomFileService', ['$http', '$q', function ($http, $q) {
        return {
            getRandomFile: getRandomFile
        };

        function getRandomFile() {
            var fileCounter = 3;
            var randomFile = Math.round(Math.random() * 9999) % fileCounter;
            return $http.get('background/' + (randomFile + 1) + '.js');
        }
    }]);
