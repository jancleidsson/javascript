function foo() {
	var a = 2;
	let b = 3;

	function bar() {
		console.log( a ); // 2

		var c = 1;

		if (true) {
			var c = 3;
			console.log(b);
		}

		if (true) {
			let d = 4;		
		}

		console.log(c);
		// console.log(d);
	}

	bar();
}

foo();