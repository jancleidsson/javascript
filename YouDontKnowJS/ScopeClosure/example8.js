function CoolModule() {
	var something = "cool";
	var another = [1, 2, 3];

	function doSomething() {
		console.log( something );
	}

	function doAnother() {
		console.log( another.join( " ! " ) );
	}

	return {
		doSomething: doSomething,
        doAnother: doAnother,
        something: something
	};
}

//there are two "requirements" for the module pattern to be exercised:

//1 - There must be an outer enclosing function, and it must be invoked at least once (each time creates a new module instance).
var foo = CoolModule();

//2 - The enclosing function must return back at least one inner function, so that this inner function has closure over the private scope, and can access and/or modify that private state.
foo.doSomething(); // cool
foo.doAnother(); // 1 ! 2 ! 3
console.log(foo.something);