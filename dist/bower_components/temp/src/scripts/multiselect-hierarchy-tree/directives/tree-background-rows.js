'use strict';

var module = angular.module('TT-UI.MultiselectHierarchyTree.Directives.TreeBackgroundRows', [
]);

function TreeBackgroundRows() {
    function drawBackgroundRows(canvas, rowCount, rowHeight) {
        var ctx = canvas.getContext('2d');
        ctx.canvas.height = rowCount*rowHeight;
        ctx.canvas.width = 2000; // make wide enough, so we dont need to worry about drawing
        ctx.fillStyle = '#FFFFFF';
        for (var i = 0; i < rowCount; i++) {
            if (i % 2 === 0) {
                var y = i * rowHeight;
                ctx.fillRect(0, y, 2000, rowHeight);
            }
        }
        ctx.canvas.style.position = 'absolute';
        ctx.canvas.style.zIndex = '-1';
        ctx.canvas.style.top = '0px';
        ctx.canvas.style.left = '0px';
    }

    return {
        restrict: 'A',
        scope: {
            rowHeight: '@'
        },
        transclude: true,
        template: '<canvas width=\'0\' height=\'0\'></canvas><div ng-transclude></div>',
        link: function(scope, elem) {
            scope.$watch(function() {
                // return the "result" of the watch expression
                return (elem.find('li').length * scope.rowHeight);
            }, function() {
                    // lets draw only when the height is changed
                    drawBackgroundRows(elem.find('canvas')[0], elem.find('li').length, scope.rowHeight);
                }
            );
        }
    };
}

TreeBackgroundRows.$inject = [];

module.directive('treeBackgroundRows', TreeBackgroundRows);