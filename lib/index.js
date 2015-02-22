/**
*
*	COMPUTE: cumprod
*
*
*	DESCRIPTION:
*		- Computes the cumulative product of a numeric array
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

// var module_alias = require( 'module_name' );


/**
* FUNCTION: cprod( arr )
*	Computes the cumulative sum of a numeric array.
*
* @param {Array} arr - numeric array
* @returns {Array} cumulative sum
*/

function cprod( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'cprod()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length,
		v = new Array( len );

	v[ 0 ] = arr[ 0 ];
	for ( var i = 1; i < len; i++ ) {
		v[ i ] = v[ i-1 ] * arr[ i ];
	}
	return v;
} // end FUNCTION cprod()



// EXPORTS //

module.exports = cprod;
