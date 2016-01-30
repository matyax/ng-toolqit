# ng-toolqit
Complementary directives and filters useful for the everyday AngularJS development.

## Install

You can install this package using either `npm` or `bower`.

### npm

```shell
npm install ng-toolqit
```

Add a `<script>` tag:

```html
<script src="/bower_components/ng-toolqit/ng-toolqit.js"></script>
```

Then add `ngToolqit` as a dependency for your app:

```javascript
angular.module('myApp', [require('ng-toolqit')]);
```

### bower

```shell
bower install ng-toolqit
```

Add a `<script>` tag:

```html
<script src="/bower_components/ng-toolqit/ng-toolqit.js"></script>
```

Then add `ngToolqit` as a dependency for your app:

```javascript
angular.module('myApp', ['ngToolqit']);
```

# Filters
## range

```html
<div ng-repeat="n in [] | range:10">
  {{ n }}
</div>
```

# Directives
## format

Applies a given format to an ngModel in an input.

Available rules:

* 9: [0-9]
* a: [A-Za-z]
* *: [A-Za-z0-9]

```html
<input type="text" ng-model="ssnInput" format format-rules="999-99-9999">
<input type="text" ng-model="dobInput" format format-rules="99/99/9999">
```