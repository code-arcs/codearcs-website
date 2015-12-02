angular.module('de.codearcs.website')
    .directive('codeConsole', ['$http', '$interval', 'RandomFileService', function ($http, $interval, RandomFileService) {
        return {
            template: '<div class="overlay"></div><pre class="javascript"></pre>',
            link: function (scope, element) {
                RandomFileService.getRandomFile()
                    .then(function (file) {
                        var codeBlock = element.find('pre');
                        var wholeText = file.data.split('');
                        var partialText = "";
                        var textPointer = 0;

                        var interval = $interval(function() {
                            if(textPointer <= wholeText.length) {
                                partialText += wholeText[textPointer];
                                codeBlock.text(partialText);
                                textPointer++;
                                hljs.highlightBlock(codeBlock[0]);
                            } else {
                                $interval.cancel(interval);
                            }
                        }, 15);

                        hljs.highlightBlock(codeBlock[0]);
                    });
            }
        }
    }]);