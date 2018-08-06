function every(array, form) {
	for(var i = 0; i < array.length; i++) {
		if(!form(array[i]))
			return false;
	}
	return true;
}


function some(array, form) {
	for(var i = 0; i < array.length; i++) {
		if(form(array[i]))
			return true;
	}
	return false;
}

console.log(every([NaN, NaN, NaN], isNaN));
console.log(every([NaN, NaN, NaN], isNaN));

console.log(some([NaN, 3, 4], isNaN));
console.log(some([2, NaN, 4], isNaN));
