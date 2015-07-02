/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cprod = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array cprod', function tests() {

	it( 'should export a function', function test() {
		expect( cprod ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative product', function test() {
		var data, actual, expected;

		data = [ 4, 2, 3, 5, 1, 2, 2 ];
		actual = new Array( data.length );
		actual = cprod( actual, data );
		expected = [ 4, 8, 24, 120, 120, 240, 480 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should zero the array once a zero is encountered', function test() {
		var data, actual, expected;

		data = [ 2, 4, 0, 3, 8, 2 ];
		expected = [ 2, 8, 0, 0, 0, 0 ];

		actual = new Array( data.length );
		actual = cprod( actual, data );

		assert.deepEqual( actual, expected );

		data = [ 0, 4, 5, 3, 8, 2 ];
		expected = [ 0, 0, 0, 0, 0, 0 ];

		actual = cprod( actual, data );

		assert.deepEqual( actual, expected );
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( cprod( [], [] ), [] );
	});

});
