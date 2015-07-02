'use strict';

// CUMULATIVE PRODUCT //

/**
* FUNCTION: cprod( out, matrix[, dim] )
*	Computes the cumulative product along a matrix dimension.
*
* @param {Matrix} out - output matirx
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute the cumulative products. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix} output matrix
*/
function cprod( out, mat, dim ) {

	var M, N,
		s0, s1,
		o,
		i, j, k,
		flg = false,
		val;

	if ( out.length !== mat.length ) {
		throw new Error( 'cprod()::invalid input arguments. Input and output matrices must be the same length.' );
	}

	if ( dim === 1 ) {
			// Compute along the rows...
			M = mat.shape[ 1 ];
			N = mat.shape[ 0 ];
			s0 = mat.strides[ 1 ];
			s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {
		k = o + i*s0;
		flg = false;
		if ( mat.data[ k ] === 0 ) {
			flg = true;
		}
		out.data[ k ] = mat.data[ k ];
		for ( j = 1; j < N; j++ ) {
			if ( flg ) {
				out.data[ k + j*s1 ] = 0;
				continue;
			}
			val = mat.data[ k + j*s1 ];
			if ( val === 0 ) {
				flg = true;
				out.data[ k + j*s1 ] = 0 ;
			} else {
				out.data[ k + j*s1 ]  = out.data[ k + (j-1)*s1 ]  * val;
			}
		}
	}
	return out;
} // end FUNCTION cprod()


// EXPORTS //

module.exports = cprod;
