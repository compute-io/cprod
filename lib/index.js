'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// CUMULATIVE PRODUCT //

/**
* FUNCTION: cprod( arr[, options] )
*	Computes the cumulative product of an array.
*
* @param {Array} arr - input array
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return new array
* @returns {Number[]} cumulative product array
*/
function cprod( arr, opts ) {
	var copy = true,
		clbk;
	if ( !isArray( arr ) ) {
		throw new TypeError( 'cprod()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'cprod()::invalid input argument. Options argument must be an object. Value: `' + opts + '`.' );
		}
		if ( opts.hasOwnProperty( 'accessor' ) ) {
			clbk = opts.accessor;
			if ( !isFunction ( clbk ) ) {
				throw new TypeError( 'cprod()::invalid option. Accessor must be a function. Value: `' + clbk + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'copy' ) ) {
			copy = opts.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'cprod()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}
	}
	var len = arr.length,
		out,
		v,
		i;

	if ( copy === true ) {
		out = new Array( len );
	} else {
		out = arr;
	}
	if ( clbk ) {
		out[ 0 ] = clbk( arr[ 0 ], 0 );
		for ( i = 1; i < len; i++ ) {
			v = out[ i-1 ];
			if ( v === 0 ) {
				out[ i ] = 0;
			} else {
				out[ i ] = v * clbk( arr[ i ], i );
			}
		}
	} else {
		out[ 0 ] = arr[ 0 ];
		for ( i = 1; i < len; i++ ) {
			out[ i ] = out[ i-1 ] * arr[ i ];
		}
	}
	return out;
} // end FUNCTION cprod()


// EXPORTS //

module.exports = cprod;
