/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	cprod = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-cprod', function tests() {

	it( 'should export a function', function test() {
		expect( cprod ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cprod( value );
			};
		}
	});

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cprod( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cprod( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided an array and an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				cprod( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should compute the cumulative product', function test() {
		var data, actual, expected;

		data = [ 4, 2, 3, 5, 1, 2, 2 ];
		actual = cprod( data );
		expected = [ 4, 8, 24, 120, 120, 240, 480 ];

		assert.deepEqual( actual, expected );

		// Mutate...
		actual = cprod( data, {
			'copy': false
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( data, expected );
	});

	it( 'should compute the cumulative product and return an array of a specific type', function test() {
		var data, actual, expected;

		data = [ 1, 4, 9, 1, 2 ];
		expected = new Int8Array( [ 1, 4, 36, 36, 72 ] );

		actual = cprod( data, {
			'dtype': 'int8'
		});
		assert.notEqual( actual, data );
		assert.strictEqual( actual.BYTES_PER_ELEMENT, 1 );
		assert.deepEqual( actual, expected );
	});

	it( 'should compute the cumulative product using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = [ 2, 8, 40, 120, 960, 1920 ];

		actual = cprod( data, {
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the cumulative product along matrix columns', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 0, 0, 3, 12, 60, 6, 42, 336 ] );
		expected = matrix( d2, [3,3], 'float64' );
		data = matrix( d1, [3,3], 'int16' );

		actual = cprod( data, {
			'dim': 2
		});

		assert.deepEqual( actual.data, expected.data );

		// Mutate...
		actual = cprod( data, {
			'copy': false,
			'dim': 2
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual.data, d2 );
	});

	it( 'should compute the cumulative product along matrix rows', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 1, 2, 0, 4, 10, 0, 28, 80 ] );
		expected = matrix( d2, [3,3], 'float64' );
		data = matrix( d1, [3,3], 'int16' );

		actual = cprod( data, {
			'dim': 1
		});

		assert.deepEqual( actual.data, expected.data );

		// Mutate...
		actual = cprod( data, {
			'copy': false,
			'dim': 1
		});
		assert.strictEqual( actual, data );
		assert.deepEqual( actual.data, d2 );
	});

	it( 'should compute the cumulative product along matrix columns and cast to a specific data type', function test() {
		var d1, d2, data, actual, expected;

		d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
		d2 = new Int16Array( [ 0, 0, 0, 3, 12, 60, 6, 42, 336 ] );
		expected = matrix( d2, [3,3], 'int16' );
		data = matrix( d1, [3,3], 'int16' );

		actual = cprod( data, {
			'dim': 2,
			'dtype': 'int16'
		});

		assert.deepEqual( actual.data, expected.data );
	});

	it( 'should compute the cumulative product of a matrix and zero elements', function test() {
		var actual, expected, data;

		data = matrix( [1,0,0,0], [2,2], 'int16' );
		actual = cprod( data, {
			'dim': 1
		});

		expected = matrix( [1,0,0,0], [2,2], 'float64' );

		assert.deepEqual( actual.data, expected.data );
	});

});
