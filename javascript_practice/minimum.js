function min (x, y) {
	if(x < y)
		return x;
	else if(x == y)
		return "both are equal";
	else
		return y;

}

console.log(min(20,10));