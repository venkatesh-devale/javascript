function reverseArray(array) {
  var output = [];
  for (var i = array.length - 1; i >= 0; i--)
    output.push(array[i]);
  return output;
}

function reverseArrayInPlace(temp_array) {
	var arr_len = temp_array.length;
	for(var i = 0; i < Math.floor(arr_len/2); i++) {
		var temp = temp_array[i];
		temp_array[i] = temp_array[arr_len-i-1];
		temp_array[arr_len-i-1] = temp;
	}
	return temp_array;
}

console.log(reverseArray([1,2,3,4,5,6,7,8,11]));

console.log(reverseArray(["A", "B", "C"]));

var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);