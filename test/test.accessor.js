/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	cprod = require( './../lib/accessor.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'accessor cprod', function tests() {

	it( 'should export a function', function test() {
		expect( cprod ).to.be.a( 'function' );
	});

	it( 'should compute the cumulative product using an accessor', function test() {
		var data, actual, expected;

		data = [
			{'x':2},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
			{'x':2},
			{'x':0},
			{'x':2}
		];
		expected = [ 2, 8, 40, 120, 960, 1920, 0, 0 ];

		actual = new Array( data.length );
		actual = cprod( actual, data, getValue );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should zero the array once a zero is encountered', function test() {
		var data, actual, expected;

		data = [
			{'x':0},
			{'x':4},
			{'x':5},
			{'x':3},
			{'x':8},
		];
		expected = [ 0, 0, 0, 0, 0 ];

		actual = new Array( data.length );
		actual = cprod( actual, data, getValue );

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should return an empty array if provided an empty array', function test() {
		assert.deepEqual( cprod( [], [], getValue ), [] );
		function getValue( d ) {
			return d.x;
		}
	});

});
