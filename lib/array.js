'use strict';

// CUMULATIVE PRODUCT //

/**
* FUNCTION: cprod( out, arr )
*	Computes the cumulative product of an array.
*
* @param {Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} out - output array
* @param {Array} arr - input array
* @returns {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} output array
*/
function cprod( v, arr ) {
	var len = arr.length,
		val,
		flg,
		i;

	if ( len ) {
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
