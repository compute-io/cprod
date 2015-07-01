Cumulative Product
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative product of an array.


## Installation

``` bash
$ npm install compute-cprod
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).

## Usage

``` javascript
var cprod = require( 'compute-cprod' );
```

#### cprod( arr[, options] )

Computes the cumulative product of an `array`. For primitive `arrays`,

``` javascript
var data = [ 1, 2, 3, 4 ];

var arr = cprod( data );
// returns [ 1, 2, 6, 24 ]
```

The function accepts two `options`:

*  __copy__: `boolean` indicating whether to return a new `array` containing the cumulative products. Default: `true`.
<<<<<<< HEAD
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.

To mutate the input `array` (e.g. when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

To mutate the input `array` (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data = [ 1, 2, 3, 4 ];

var arr = cprod( data, {
	'copy': false
});
// returns [ 1, 2, 6, 24 ]

console.log( data === arr );
// returns true
```

For object `arrays`, provide an accessor `function` for accessing numeric `array` values.


``` javascript
var data = [
	['beep', 1],
	['boop', 2],
	['bap', 3],
	['baz', 4]
];

function getValue( d, i ) {
	return d[ 1 ];
}

var arr = cprod( arr, {
	'accessor': getValue
});
// returns [ 1, 2, 6, 24 ]
```

__Note__: the function returns an `array` with a length equal to the original input `array`.



## Examples

``` javascript
var cprod = require( 'compute-cprod' );

var data = new Array( 10 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 ) + 1;
}

console.log( cprod( data ) );
// returns [...]
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Philipp Burckhardt.


[npm-image]: http://img.shields.io/npm/v/compute-cprod.svg
[npm-url]: https://npmjs.org/package/compute-cprod

[travis-image]: http://img.shields.io/travis/compute-io/cprod/master.svg
[travis-url]: https://travis-ci.org/compute-io/cprod

[coveralls-image]: https://img.shields.io/coveralls/compute-io/cprod/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/cprod?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/cprod.svg
[dependencies-url]: https://david-dm.org/compute-io/cprod

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/cprod.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/cprod

[github-issues-image]: http://img.shields.io/github/issues/compute-io/cprod.svg
[github-issues-url]: https://github.com/compute-io/cprod/issues
