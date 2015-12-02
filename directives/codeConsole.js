angular.module('de.codearcs.website')
    .directive('codeConsole', ['$http', '$interval', '$timeout', '$q', 'RandomFileService', function ($http, $interval, $timeout, $q, RandomFileService) {
        return {
            template: '<div class="overlay"></div><pre class="javascript"></pre>',
            link: function (scope, element) {
                var partialText = "";
                var textPointer = 0;
                var intervalSpeed = 15;
                var codeBlock = element.find('pre');
            
                RandomFileService.getRandomFile()
                    .then(function (file) {
                        var wholeTextLines = file.data.split('\n');
                                                           
                        processLines(wholeTextLines, 0);
                        
                        
                        hljs.highlightBlock(codeBlock[0]);
                    });
                    
                function processLines(lines, lineIndex) {
                    return processLine(lines, lineIndex)
                        .then(function() {
                            if(lineIndex <= lines.length) {
                                $timeout(function() {
                                    return processLines(lines, ++lineIndex);
                                }, 500);
                            } 
                        })
                }
                    
                function processLine(lines, lineIdx) {
                    var deferred = $q.defer();
                    var idx = 0;
                    var chars = lines[lineIdx].split('');
                    var intervalSpeed = chars.join('').trim().length > 0 ? 20 : 0;
                    var interval = $interval(function() {
                        if(idx < chars.length) {
                            partialText += chars[idx];
                            codeBlock.text(partialText);
                            idx++;
                            
                            hljs.highlightBlock(codeBlock[0]);
                        } else {
                            $interval.cancel(interval);
                            deferred.resolve();
                        }
                    }, intervalSpeed);
                    
                    return deferred.promise;
                }
            }
        }
    }]);