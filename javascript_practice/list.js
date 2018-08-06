function arrayToList(array) {
  var list = null;
  for (var i = array.length - 1; i >= 0; i--)
    list = {value: array[i], rest: list};
  return list;
}

function listToArray(list) {
	var array = [];
	var i = 0;
	while(list.rest != null) {
		array[i++] = list.value;
		list = list.rest;
	}
	array[i] = list.value;
	return array;
}

function prepend (element, list) {
	var temp_list = null;
	temp_list = {value : element, rest : list};
	return temp_list;
}

function nth (n, list) {
	if(n == 1) {
		return list.value;
	}
	else {
		var cnt = 2;
		for( var node = list.rest; node.rest != null; node = node.rest) {
			
			if(cnt == n)
				return node.value;
			cnt++;
		}
	}
	if(node.rest == null) {
		if(cnt == n)
			return node.value;
		else 
			return undefined;
	}
		
}


//console.log(listToArray(prepend(1, (arrayToList([10, 5, 40, 55, 12])))));
console.log(nth(4, arrayToList([10,20,30,40,50,60,70])));




