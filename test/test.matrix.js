/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	cprod = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix cprod', function tests() {

	var out1, out2,
		mat,
		d1, d2, d3;

	d1 = new Int16Array( [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] );
	d2 = new Int16Array( [ 0, 0, 0, 3, 12, 60, 6, 42, 336 ] );
	d3 = new Int16Array( [ 0, 1, 2, 0, 4, 10, 0, 28, 80 ] );

	beforeEach( function before() {
		mat = matrix( d1, [3,3], 'int16' );
		out1 = matrix( d2, [3,3], 'int16' );
		out2 = matrix( d3, [3,3], 'int16' );
	});

	it( 'should export a function', function test() {
		expect( cprod ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided unequal length matrices', function test() {
		expect( badValues ).to.throw( Error );
		function badValues() {
			cprod( matrix( [10,10] ), mat );
		}
	});

	it( 'should compute the cumulative product along matrix columns', function test() {
		var actual;

		actual = matrix( [3,3], 'int16' );
		actual = cprod( actual, mat, 2 );

		assert.deepEqual( actual.data, out1.data );
	});


	it( 'should compute the cumulative product along matrix rows', function test() {
		var actual;

		actual = matrix( [3,3], 'int16' );
		actual = cprod( actual, mat, 1 );

		assert.deepEqual( actual.data, out2.data );
	});
	

	it( 'should return an empty matrix if provided an empty matrix', function test() {
		var out, mat, expected;

		out = matrix( [0,0] );
		expected = matrix( [0,0] ).data;

		mat = matrix( [0,10] );
		assert.deepEqual( cprod( out, mat ).data, expected );

		mat = matrix( [10,0] );
		assert.deepEqual( cprod( out, mat ).data, expected );

		mat = matrix( [0,0] );
		assert.deepEqual( cprod( out, mat ).data, expected );
	});

});
