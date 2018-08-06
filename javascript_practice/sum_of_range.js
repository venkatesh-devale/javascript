function range(start, end, difference) {
	var array = [];
	var i = start;

	if(difference == undefined)
		difference = 1;

	var length = Math.ceil((Math.abs(start - end) + 1)/Math.abs(difference));
	while(array.length < length) {
		array.push(i);
		if(difference < 0) {
			i -= Math.abs(difference);
		} else {
			i += difference;
		}
	}
	console.log(array);
	return array;
}


function sum(arrayToSum) {
	var sum = 0;
	for(var i = 0; i < arrayToSum.length; i++) {
		sum += arrayToSum[i];
	}
	return sum;
}

console.log(sum(range(5,2,-2)));

