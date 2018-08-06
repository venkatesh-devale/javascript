function countBs(string) {
	var cntB = 0;
	var tempString = String(string);
	var tempLength = tempString.length;
	for(var cnt = 0; cnt < tempLength; cnt++) {
		if(tempString.charAt(cnt) == "B")
			cntB++;
	}
	return cntB;
}

function countChar(subString, letter) {
	var cntLetter = 0;
	var tempString = String(subString);
	var tempLength = tempString.length;
	for(var cnt = 0; cnt < tempLength; cnt++) {
		if(tempString.charAt(cnt) == letter)
			cntLetter++;
	}
	return cntLetter;
}


console.log(countBs("BbC"));

console.log(countChar("kakkerlakk", "k"));