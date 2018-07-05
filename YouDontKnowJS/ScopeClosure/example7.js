// for (var i=1; i<=5; i++) {
// 	setTimeout( function timer(){
// 		console.log( i );
// 	}, i*1000 );
// }
//all are closed over the same shared global scope, which has, in fact, only one i in it.  All functions share a reference to the same i

// for (var i=1; i<=5; i++) {
// 	(function(){
// 		setTimeout( function timer(){
// 			console.log( i );
// 		}, i*1000 );
// 	})();
// }

// for (var i=1; i<=5; i++) {
// 	(function(){
//         var j = i;
// 		setTimeout( function timer(){
// 			console.log( j );
// 		}, i*1000 );
// 	})();
// }

// for (var i=1; i<=5; i++) {
// 	(function(j){
// 		setTimeout( function timer(){
// 			console.log( j );
// 		}, j*1000 );
// 	})( i );
// }

// for (var i=1; i<=5; i++) {
// 	let j = i; // yay, block-scope for closure!
// 	setTimeout( function timer(){
// 		console.log( j );
// 	}, j*1000 );
// }
//let declaration, which hijacks a block and declares a variable right there in the block.

// for (let i=1; i<=5; i++) {
//     setTimeout( function timer(){
// 		console.log( i );
// 	}, i*1000 );
// }
//let declarations used in the head of a for-loop. This behavior says that the variable will be declared not just once for the loop, but each iteration.

for (var i=1; i<=5; i++) {
    console.log(i);
    setTimeout( function timer(){
		console.log( i );
	}, i*1000 );
}