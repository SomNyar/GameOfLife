console.log("once again");

//Setting HEIGHT of simulation space
document.getElementById("canvasHeight").addEventListener('change',function(){
	document.getElementById("canvas").height = this.value;
})

//Setting WIDTH of simulation space
document.getElementById("canvasWidth").addEventListener('change',function(){
	document.getElementById("canvas").width = this.value;
})


var rows = 100;
var cols = 100;

document.getElementById("row").addEventListener('change',function(){
	console.log(this.value);
	rows = this.value;
})

