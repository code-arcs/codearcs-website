angular.module('de.codearcs.website')
    .directive('codeConsole', ['$http', '$interval', '$timeout', '$q', 'RandomFileService',
        function ($http, $interval, $timeout, $q, RandomFileService) {
            return {
                template: '<code><pre class="javascript"></pre></code>',
                link: function (scope, element) {
                    var partialText = "";
                    var codeBlock = element.find('pre');
                    var waitAfterLineDuration = 500;
                    var waitAfterCharDuration = 20;
                    var cursor = $(document.createElement('span')).addClass('cursor');
                    var wholeText = "";

                    hljs.highlightBlock(codeBlock[0]);
                    codeBlock.append(cursor);

                    RandomFileService.getRandomFile()
                        .then(function (file) {
                            wholeText = file.data;
                            var wholeTextLines = wholeText.split(/(\n)/);
                            processLines(wholeTextLines, 0);
                        });

                    function processLines(lines, lineIndex) {
                        var isLastElementVisible = isElementInViewport($('span:last', codeBlock)[0]);

                        if (!isLastElementVisible) {
                            codeBlock.text(wholeText);
                            hljs.highlightBlock(codeBlock[0]);
                            return;
                        } else {
                            return processLine(lines, lineIndex)
                                .then(function () {
                                    if (lineIndex <= lines.length) {
                                        var intervalSpeed = lines[lineIndex].trim().length > 0 ? random(waitAfterLineDuration, waitAfterLineDuration * 2) : 0;
                                        $timeout(function () {
                                            return processLines(lines, ++lineIndex);
                                        }, intervalSpeed);
                                    }
                                });
                        }

                    }

                    function processLine(lines, lineIdx) {
                        var deferred = $q.defer();
                        var idx = 0;
                        var chars = lines[lineIdx].split('');
                        var intervalSpeed = chars.join('').trim().length > 0 ? waitAfterCharDuration : 0;
                        var interval = $interval(process, intervalSpeed);

                        function process() {
                            if (idx < chars.length) {
                                codeBlock.find('.cursor').remove();
                                partialText += chars[idx];
                                codeBlock.text(partialText);
                                idx++;
                                hljs.highlightBlock(codeBlock[0]);
                                codeBlock.append(cursor);
                            } else {
                                deferred.resolve();
                                $interval.cancel(interval);
                            }
                        }

                        return deferred.promise;
                    }

                    function isElementInViewport(el) {
                        if (!el) {
                            return true;
                        }

                        var top = el.offsetTop;
                        var left = el.offsetLeft;
                        var width = el.offsetWidth;
                        var height = el.offsetHeight;

                        while (el.offsetParent) {
                            el = el.offsetParent;
                            top += el.offsetTop;
                            left += el.offsetLeft;
                        }

                        return (
                            top < (window.pageYOffset + window.innerHeight) &&
                            left < (window.pageXOffset + window.innerWidth) &&
                            (top + height) > window.pageYOffset &&
                            (left + width) > window.pageXOffset
                        );
                    }

                    function random(min, max) {
                        return Math.floor(Math.random() * (max - min + 1) + min);
                    }
                }
            }
        }]);