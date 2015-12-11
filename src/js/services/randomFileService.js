angular.module('de.codearcs.website')
    .service('RandomFileService', ['$http', '$q', function ($http, $q) {

        var map = [
            {name: 'jasmine.js', type: 'javascript'},
            {name: 'simple.js', type: 'javascript'},
            {name: 'simple.scss', type: ''},
            {name: 'junit.java', type: 'java'},
            {name: 'simple.java', type: 'java'},
            {name: 'simple.html', type: 'html'}
        ];

        return {
            getRandomFile: getRandomFile
        };

        function getRandomFile() {
            var randomFile = Math.round(Math.random() * 9999) % map.length;
            return $http.get('background/' + map[randomFile].name + "?time=" + Date.now())
                .then(function(file) {
                    return {
                        file: file,
                        type: map[randomFile].type
                    }
                });
        }
    }]);
