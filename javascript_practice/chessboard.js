/*var line = "";
for(var i = 1; i <= 8; i++) {
	
	for( var j = 1; j <= 8; j++) {
		if(i % 2 == 0)
			line += "#";
		else
			line += " ";
	}

	
}
console.log(line);*/

var size = 8;

var board = "";

for (var y = 0; y < size; y++) {
  for (var x = 0; x < size; x++) {
    if ((x + y) % 2 == 0)
      board += " ";
    else
      board += "#";
  }
  board += "\n";
}

console.log(board);