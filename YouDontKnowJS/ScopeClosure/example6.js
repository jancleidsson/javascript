var a = 2;

(function IIFE(){
    // var a = 2;
    function test() {
        console.log( a );
    }
    return test;
})()();

//It not closure, IIFE pattern