/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

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

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cprod( value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cprod( [], value );
			};
		}
	});

	it( 'should compute the cumulative product', function test() {
		var data, expected, results;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = [ 2, 8, 40, 120, 960, 1920 ];

		results = cprod( data );

		assert.strictEqual( results.length, data.length );
		assert.deepEqual( results, expected );
	});

	it( 'should compute the cumulative product using an accessor function', function test() {
		var data, expected, results;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2}
		];
		expected = [ 2, 8, 40, 120, 960, 1920 ];

		results = cprod( data, getValue );

		assert.strictEqual( results.length, data.length );
		assert.deepEqual( results, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should zero the array once a zero is encountered', function test() {
		var data, expected, results;

		data = [ 2, 4, 0, 3, 8, 2 ];
		expected = [ 2, 8, 0, 0, 0, 0 ];

		results = cprod( data );

		assert.deepEqual( results, expected );

		data = [ 0, 4, 5, 3, 8, 2 ];
		expected = [ 0, 0, 0, 0, 0, 0 ];

		results = cprod( data );

		assert.deepEqual( results, expected );
	});

	it( 'should zero the array once a zero is encountered when using an accessor function', function test() {
		var data, expected, results;

		data = [ 2, 4, 0, 3, 8, 2 ];
		expected = [ 2, 8, 0, 0, 0, 0 ];

		results = cprod( data, getValue );

		assert.deepEqual( results, expected );

		data = [ 0, 4, 5, 3, 8, 2 ];
		expected = [ 0, 0, 0, 0, 0, 0 ];

		results = cprod( data, getValue );

		assert.deepEqual( results, expected );

		function getValue( d ) {
			return d;
		}
	});

});
