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
    directive('format', ['$browser', function ($browser) {
      var lastInput = null;

      return {
        require: 'ngModel',
        link: link
      };

      function link(scope, element, attr, ngModel) {
        if (! attr.formatRules) {
          throw new Error('Missing format rules.');
        }

        ngModel.$formatters.push(function (value) {
          return applyFormatRules(value, attr.formatRules);
        });

        ngModel.$parsers.push(function (value) {
          value = applyFormatRules(value, attr.formatRules);

          element.val(value);

          return value;
        });

        var listener = function () {
          element.val(
            applyFormatRules(element.val(), attr.formatRules)
          );
        };

        element.bind('change', listener);
        element.bind('keydown', function() {
            $browser.defer(listener);
        });
        element.bind('cut paste', function() {
            $browser.defer(listener);
        });
      }

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
        if ((! input) || (input === lastInput)) {
          return input;
        }

        if (typeof input !== 'string') {
          input = input.toString();
        }

        console.log('running');

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

        inputChars.filter(function (value, i) {
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

        lastInput = output;

        return output;
      }
  }]);
})(window, window.angular);