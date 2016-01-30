/*
 * ng-toolqit
 * https://github.com/matyax/ng-toolqit

 * Version: 1.0.1
 * License: MIT
 */
(function(window, angular, undefined) {'use strict';


  angular.module('ngToolqit', ['ng']).
    /**
     * @ngdoc filter
     * @name range
     *
     * @description
     * Creates a range of `quantity´ elements for an ng-repeat.
     */
    filter('range', function () {
      return function (range, quantity) {
        if (typeof range !== 'object') {
          throw new Error('Filter input must be an empty array.');
        }

        quantity = parseInt(quantity);

        for (var i = 0; i < quantity; i++) {
          range.push(i);
        }

        return range;
      };
    });

  angular.module('ngToolqit').
    /**
     * @ngdoc directive
     * @name format
     *
     * @description
     * Formats the input of an ngModel according to the given format rules.
     */
    directive('format', [function () {
      return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModel) {
          if (! attr.formatRules) {
            throw new Error('Missing format rules.');
          }

          ngModel.$parsers.push(function (value) {
            value = applyFormatRules(value, attr.formatRules);

            element.val(value);

            return value;
          });
        }
      };

      /**
       * Apply a set of rules to a given string.
       *
       * @param {string} input Input string
       * @param {string} rules Rules
       * @return {string} Transformed string
       *
       * @example
       * Rules:
       * 9: [0-9]
       * a: [a-zA-Z]
       * *: [a-zA-Z0-9]
       *
       * E.g. ssn: 999-99-9999
       */
      function applyFormatRules(input, rules) {
        var rulesHash = {
              '9': '[0-9]',
              'a': '[a-zA-Z]',
              '\\*': '[a-zA-Z0-9]'
            },
            fullRegExp = rules, //Full pattern regular expression to test the entire input.
            output     = '';

        for (var rule in rulesHash) {
          fullRegExp = fullRegExp.replace(new RegExp(rule, 'g'), rulesHash[rule]);
        }

        input = input.substring(0, rules.length);

        if (input.match(fullRegExp)) {
          return input; //No need to keep testing the input
        }

        var inputChars = input.split(''),
            ruleChars  = rules.split('');

        inputChars.filter(function (value, i, inputChars) {
          if (! rulesHash[ruleChars[i]]) { //Literal string, insert and splice input value
            output += ruleChars[i];

            if (value === ruleChars[i]) {
              return true;
            }
          }

          if (value.match(rulesHash[ruleChars[i]])) {
            output += value;
            return true;
          }

          return false;
        });

        return output;
      }
  }]);
})(window, window.angular);