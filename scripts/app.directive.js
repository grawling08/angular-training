(function(){
    'use strict';

    angular.module('starter')
        .directive('scrollable',scrollable);
    
    scrollable.$inject = ['$document', '$interval', '$timeout', '$window'];
    
    function scrollable($document, $interval, $timeout, $window){
        
        return {
            restrict: 'A',
            link: function($scope, wrappedElement, attributes) {
                var element = wrappedElement[0],
                    navTabsElement,
                    scrollTimer,
                    dragInfo = {};
    
                init();
    
                function startScroll($event) {
                    if ($event.target == element) {
                        // TODO should use requestAnimationFrame
                        scrollTimer = $interval(function() {
                            navTabsElement.scrollLeft += ($event.clientX > 200) ? 5 : -5;
                        }, 1000 / 60);
                    }
                };
    
                function stopScroll($event) {
                    $interval.cancel(scrollTimer);
                }
    
                function onDocumentMouseMove($event) {
                    var differenceX = $event.pageX - dragInfo.lastPageX;
    
                    dragInfo.lastPageX = $event.pageX;
                    dragInfo.moved = true;
    
                    navTabsElement.scrollLeft -= differenceX;
                }
    
                function onDocumentMouseUp($event) {
                    //$event.preventDefault();
                    //$event.stopPropagation();
                    //$event.cancelBubble = true;
    
                    $document.off('mousemove', onDocumentMouseMove);
                    $document.off('mouseup', onDocumentMouseUp);
    
                    // wow
                    if (dragInfo.moved === true) {
                        [].forEach.call(navTabsElement.querySelectorAll('li a'), function(anchor) {
                            var anchorScope = angular.element(anchor).scope();
                            anchorScope.oldDisabled = anchorScope.disabled;
                            anchorScope.disabled = true;
                        });
                        $timeout(function() {
                            [].forEach.call(navTabsElement.querySelectorAll('li a'), function(anchor) {
                                var anchorScope = angular.element(anchor).scope();
                                anchorScope.disabled = anchorScope.oldDisabled;
                                delete anchorScope.oldDisabled;
                            });
                        });
                    }
                }
    
                function onNavTabsMouseDown($event) {
                    var currentlyScrollable = element.classList.contains('scrollable');
    
                    if (currentlyScrollable === true) {
                        $event.preventDefault();
    
                        dragInfo.lastPageX = $event.pageX;
                        dragInfo.moved = false;
    
                        $document.on('mousemove', onDocumentMouseMove);
                        $document.on('mouseup', onDocumentMouseUp);
                    }
                }
    
                function onWindowResize() {
                    checkForScroll();
                }
                
                function checkForScroll(){
                    //console.log('checking tabs for scroll');
                    var currentlyScrollable = element.classList.contains('scrollable'),
                        difference = 1;
    
                    // determine whether or not it should actually be scrollable
                    // the logic is different if the tabs are currently tagged as scrollable
                    if (currentlyScrollable === true) {
                        difference = navTabsElement.scrollWidth - navTabsElement.clientWidth;
                    } else {
                        difference = navTabsElement.clientHeight - navTabsElement.querySelector('.nav-tabs > li').clientHeight;
                    }
                    //console.log(difference);
    
                    if (difference > 2) {
                        element.classList.add('scrollable');
                    } else {
                        element.classList.remove('scrollable');
                    }
                }
    
                function bindEventListeners() {
                    wrappedElement.on('mousedown', function($event) {
                        startScroll($event);
                    });
                    
                    wrappedElement.on('click', function($event) {
                        //console.log('CLICK', $event.defaultPrevented);
                    });
    
                    wrappedElement.on('mouseup mouseleave', function($event) {
                        stopScroll($event);
                    });
    
                    angular.element(navTabsElement).on('mousedown', onNavTabsMouseDown);
    
                    $window.addEventListener('resize', onWindowResize);
    
                    $scope.$on('$destroy', function() {
                        wrappedElement.off('mousedown mouseup mouseleave');
                        angular.element(navTabsElement).off('mousedown', onNavTabsMouseDown);
                        $window.removeEventListener('resize', onWindowResize);
                    });
                }
    
                $scope.$on('checkTabs', function(){ $timeout(checkForScroll, 10); });
    
                function init() {
                    // wait for tabs, sucks
                    $timeout(function() {
                        navTabsElement = element.querySelector('.nav-tabs');
    
                        bindEventListeners();
                        onWindowResize();
                    });
                }
            }
        }
    }
})();