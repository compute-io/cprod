'use strict';

var matrix = require( 'dstructs-matrix' ),
	cprod = require( './../lib' );

var data,
	mat,
	out,
	tmp,
	i;

// ----
// Plain arrays...
data = new Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random()*10 ) + 1;
}
out = cprod( data );
console.log( 'Arrays: %s\n', out );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
out = cprod( data, {
	'accessor': getValue
});
console.log( 'Accessors: %s\n', out );

// ----
// Typed arrays...
data = new Int32Array( 10 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round( Math.random() * 10 ) + 1;
}
tmp = cprod( data );
out = '';
for ( i = 0; i < data.length; i++ ) {
	out += tmp[ i ];
	if ( i < data.length-1 ) {
		out += ',';
	}
}
console.log( 'Typed arrays: %s\n', out );


// ----
// Matrices...
mat = matrix( data, [5,2], 'int32' );
out = cprod( mat );
console.log( 'Matrix (along columns): %s\n', out.toString() );

out = cprod( mat, {
	'dim': 1
});
console.log( 'Matrix (along rows): %s\n', out.toString() );


// ----
// Matrices (custom output data type)...
out = cprod( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (along columns, %s): %s\n', out.dtype, out.toString() );
