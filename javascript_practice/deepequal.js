function deepEqual (x, y) {
	if(x === y) 
		return true;
	if(x == null || y == null || typeof x != "object" || typeof y != "object")
		return false;

	var prop_cntInA = 0;
	var prop_cntInB = 0;

	for(var tmp in x)
		prop_cntInA += 1;

	for(var tmp in y) {
		prop_cntInB += 1;
		if(!(tmp in x) || !deepEqual(x[tmp],y[tmp]))
			return false;
	}

	return prop_cntInA == prop_cntInB;


}


var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));

console.log(deepEqual(obj, {here: 1, object: 2}));

console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));


