// var a = 2;

// //function expression
// (function foo(){ // <-- insert this

// 	var a = 3;
// 	console.log( a ); // 3

// })(); // <-- and this

// console.log( a ); // 2

// //anonymous function expression
// setTimeout( function jan(){
// 	console.log("I waited 1 second!");
// }, 3000 );

// var a = 2;

//Invoking Function Expressions Immediately
// (function IIFE(){

// 	var a = 3;
//     console.log( a ); // 3

// })();

// console.log( a ); // 2

// var a = 2;

// (function IIFE( valid ){
//     if (valid) {
//         var a = 3;
//         console.log( a ); // 3
//     }
// })( true );

// console.log( a ); // 2

//Passa uma função global pra ser executada em um escopo específico
// var a = 2;
// (function IIFE( def ){
// 	def( 5 );
// })(function def( global ){
// 	var a = 3;
// 	console.log( a ); // 3
// 	console.log( global); // 2
// });


// var foo = true;
// if (foo) {
//     let bar = 2;
// }
// console.log( bar );

// {
//     console.log( bar ); // ReferenceError!
//     var bar = 2;
// }

foo();

function foo() {
	console.log( 1 );
}

var foo = function() {
	console.log( 2 );
}

function foo() {
	console.log( 3 );
}