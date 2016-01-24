/*
 * ng-toolqit
 * https://github.com/matyax/ng-toolqit

 * Version: 1.0.0
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';


angular.module('ngToolqit', ['ng']).

  filter('range', function() {
    return function(range, quantity) {
      if (typeof range != 'object') {
        throw new Error('Filter input must be an empty array.');
      }

      quantity = parseInt(quantity);

      for (var i = 0; i < quantity; i++) {
        range.push(i);
      }

      return range;
    };
  });


})(window, window.angular);