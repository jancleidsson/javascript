// function foo() {
// 	var a = 2;
// 	function bar() {
// 		console.log( a );
// 	}
// 	return bar;
// }
// var baz = foo();
// baz();

// var baz  = function () {
// 	var a = 2;
// 	function bar() {
// 		console.log( a );
// 	}
// 	return bar;
// }
// baz();

// var baz  = function () {
// 	console.log( test );
// }
// baz();

var baz  = function () {
	var a = 2;
	function bar() {
		console.log( a );
	}
	return bar;
}
 baz.bar();