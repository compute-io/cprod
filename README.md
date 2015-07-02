Cumulative Product
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the cumulative product.


## Installation

``` bash
$ npm install compute-cprod
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).

## Usage

``` javascript
var cprod = require( 'compute-cprod' );
```

#### cprod( x[, options] )

Computes the cumulative product. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, arr;

data = [ 1, 2, 3, 4 ];
arr = cprod( data );
// returns [ 1, 2, 6, 24 ]
```

The function accepts the following `options`:

*  __copy__: `boolean` indicating whether to return a new data structure containing the cumulative products. Default: `true`.
*  __accessor__: accessor `function` for accessing numerical values in object `arrays`.
*  __dim__: dimension along which to compute the cumulative product when provided a matrix. Default: `2` (along the columns).
*  __dtype__: output data type. Default: `float64`.

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

By default, the function computes the cumulative product for a [`matrix`](https://github.com/dstructs/matrix) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	out,
	i;

data = new Int8Array( 9 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int8' );
/*
	[  0  1  2  
	   3  4  5
	   6  7  8 ]
*/

out = cprod( mat );
/*
	[  0   0   0  
	   3  12  60
	   6  42 336 ]
*/
```

To compute the cumulative product along the rows, set the `dim` option to `1`.

``` javascript
out = cprod( mat, {
	'dim': 1
});
/*
	[  0   1   2
	   0   4  10
	   0  28  80 ]
*/
```

By default, the output data type is `float64`. To specify a different data type, set the `dtype` option (see [`matrix`](https://github.com/dstructs/matrix) for a list of acceptable data types).

``` javascript
out = cprod( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[  0   1   2
	   0   4  10
	   0  28  80 ]
*/

var dtype = mu.dtype;
// returns 'uint8'

out = cprod( [ 1, 2, 3, 4 ], {
	'dtype': 'uint8'
})
// returns Uint8Array( [ 1,2,6,24] )
```

By default, the function returns a new data structure. To mutate the input data structure (e.g., when input values can be discarded or when optimizing memory usage), set the `copy` option to `false`.

``` javascript
var data,
	bool,
	mat,
	out,
	i;

data = [ 1, 2, 3, 4 ];

out = cprod( data, {
	'copy': false
});
// returns [ 1, 2, 6, 24 ]

bool = ( data === out );
// returns true

data = new Int16Array( 6 );
for ( i = 0; i < 9; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [3,3], 'int16' );
/*
	[  0  1  2  
	   3  4  5
	   6  7  8 ]
*/

out = cprod( mat, {
	'copy': false
});
/*
	[  0   0   0  
	   3  12  60
	   6  42 336 ]
*/

bool = ( mat === out );
// returns true
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	cprod = require( 'compute-cprod' );

var data,
	mat,
	out,
	tmp,
	i;

// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 ) + 1;
}
out = cprod( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = cprod( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 ) + 1;
}
tmp = cprod( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}

// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = cprod( mat );

out = cprod( mat, {
	'dim': 1
});

// Matrices (custom output data type)...
out = cprod( mat, {
	'dtype': 'uint8'
});
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

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


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
