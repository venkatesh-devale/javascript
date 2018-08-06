// function ConstRabbit(type){
// 	this.type = type;
// }

var protoRabbit = {
	speak: function(string) {
		return "The "+this.type+"rabbit says "+string;
	}
}

var blackRabbit = Object.create(protoRabbit);

blackRabbit.type = "black";


// var blackRabbit = new ConstRabbit("black");

// ConstRabbit.prototype.speak = function(string) {
// 		return "The "+this.type+"rabbit says "+string;
// 	};

console.log(blackRabbit.speak("hello"));