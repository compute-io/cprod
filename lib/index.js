/**
*
*	COMPUTE: cumprod
*
*
*	DESCRIPTION:
*		- Computes the cumulative product of an array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Philipp Burckhardt.
*
*
*	AUTHOR:
*		Philipp Burckhardt. pburckhardt@outlook.com. 2015.
*
*/

'use strict';

// MODULES //

var isArray = require( 'validate.io-array' );


// CUMULATIVE PRODUCT //

/**
* FUNCTION: cprod( arr[, accessor] )
*	Computes the cumulative product of an array.
*
* @param {Array} arr - numeric array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Array} cumulative product
*/

function cprod( arr, clbk ) {
	if ( !isArray( arr ) ) {
		throw new TypeError( 'cprod()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {
		if ( typeof clbk !== 'function' ) {
			throw new TypeError( 'cprod()::invalid input argument. Accessor must be a function. Value: `' + clbk + '`.' );
		}
	}
	var len = arr.length,
		v = new Array( len ),
		val,
		flg,
		i;

	if ( clbk ) {
		val = clbk( arr[ 0 ] );
		if ( val === 0 ) {
			flg = true;
		}
		v[ 0 ] = val;
		for ( i = 1; i < len; i++ ) {
			if ( flg ) {
				v[ i ] = 0;
				continue;
			}
			val = clbk( arr[ i ] );
			if ( val === 0 ) {
				flg = true;
				v[ i ] = 0;
			} else {
				v[ i ] = v[ i-1 ] * val;
			}
		}
	} else {
		val = arr[ 0 ];
		if ( val === 0 ) {
			flg = true;
		}
		v[ 0 ] = val;
		for ( i = 1; i < len; i++ ) {
			if ( flg ) {
				v[ i ] = 0;
				continue;
			}
			val = arr[ i ];
			if ( val === 0 ) {
				flg = true;
				v[ i ] = 0;
			} else {
				v[ i ] = v[ i-1 ] * val;
			}
		}
	}
	return v;
} // end FUNCTION cprod()


// EXPORTS //

module.exports = cprod;
