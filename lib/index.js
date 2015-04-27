'use strict';

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isBoolean = require( 'validate.io-boolean-primitive' ),
	isFunction = require( 'validate.io-function' );


// CUMULATIVE PRODUCT //

/**
* FUNCTION: cprod( arr[, accessor] )
*	Computes the cumulative product of an array.
*
* @param {Array} arr - numeric array
* @param {Object} [options] - function options
* @param {Function} [options.accessor] - accessor function for accessing array values
* @param {Boolean} [options.copy=true] - boolean indicating whether to return new array
* @returns {Array} cumulative product
*/

function cprod( arr, options ) {

	var clbk, copy = true;

	if ( !isArray( arr ) ) {
		throw new TypeError( 'cprod()::invalid input argument. Must provide an array. Value: `' + arr + '`.' );
	}
	if ( arguments.length > 1 ) {

		if ( !isObject( options ) ) {
			throw new TypeError( 'cprod()::invalid input argument. Options must be an object. Value: `' + options + '`.' );
		}

		if ( options.hasOwnProperty( 'accessor' ) ) {
			clbk = options.accessor;
			if ( !isFunction ( clbk ) ) {
				throw new TypeError( 'cprod()::invalid option. Accessor must be a function. Value: `' + clbk + '`.' );
			}
		}

		if ( options.hasOwnProperty( 'copy' ) ) {
			copy = options.copy;
			if ( !isBoolean( copy ) ) {
				throw new TypeError( 'cprod()::invalid option. Copy option must be a boolean primitive. Value: `' + copy + '`.' );
			}
		}

	}

	var len = arr.length,
		v,
		val,
		flg,
		i;

	if ( copy === true ) {
		v = new Array( len );
	} else {
		v = arr;
	}

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
