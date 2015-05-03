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

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				cprod( [], value );
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
				cprod( [], {
					'accessor': value
				});
			};
		}
	});

	it( 'should throw an error if provided a copy option which is not a boolean primitive', function test() {
		var values = [
			'5',
			5,
			new Boolean( true ),
			function(){},
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
				cprod( [1,2,3,4,5], {
					'copy': value
				});
			};
		}
	});


	it( 'should compute the cumulative product', function test() {
		var data, expected, actual;

		data = [ 2, 4, 5, 3, 8, 2 ];

		actual = cprod( data );
		expected = [ 2, 8, 40, 120, 960, 1920 ];

		assert.strictEqual( actual.length, data.length );
		assert.deepEqual( actual, expected );
	});

	it( 'should not mutate the input array by default', function test() {
		var data, expected, actual;

		data = [ 1, 2, 3 ];

		actual = cprod( data );
		expected = [ 1, 2, 6 ];

		assert.deepEqual( actual, expected );
		assert.ok( actual !== data );
	});

	it( 'should compute the cumulative product using an accessor function', function test() {
		var data, expected, actual;

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

		assert.strictEqual( actual.length, data.length );
		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the cumulative product and mutate the input array', function test() {
		var data, expected, actual;

		data = [ 1, 2, 3 ];

		actual = cprod( data, {
			'copy': false
		});
		expected = [ 1, 2, 6 ];

		assert.deepEqual( actual, expected );
		assert.ok( actual === data );
	});

	it( 'should zero the array once a zero is encountered', function test() {
		var data, expected, actual;

		data = [ 2, 4, 0, 3, 8, 2 ];

		actual = cprod( data );
		expected = [ 2, 8, 0, 0, 0, 0 ];

		assert.deepEqual( actual, expected );

		data = [ 0, 4, 5, 3, 8, 2 ];

		actual = cprod( data );
		expected = [ 0, 0, 0, 0, 0, 0 ];

		assert.deepEqual( actual, expected );
	});

	it( 'should zero the array once a zero is encountered when using an accessor function', function test() {
		var data, expected, actual;

		data = [ 2, 4, 0, 3, 8, 2 ];
		expected = [ 2, 8, 0, 0, 0, 0 ];

		actual = cprod( data, {
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );

		data = [ 0, 4, 5, 3, 8, 2 ];
		expected = [ 0, 0, 0, 0, 0, 0 ];

		actual = cprod( data, {
			'accessor': getValue
		});

		assert.deepEqual( actual, expected );

		function getValue( d ) {
			return d;
		}
	});

});
