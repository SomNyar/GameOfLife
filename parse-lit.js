
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
} else {
  alert('The File API is not supported in this browser.');
}

// .lit format:
/*
"#D" Description (Multiple rows)
"#N" new-line (Single denominator)
"#P" starting coordinates, next lines desctibe animal shape (multiple #P-s)
*/

// Opening file and collecting data
var s = "";

document.getElementById("openFile").addEventListener('change',function(){
  let fr = new FileReader();
  fr.onload = function() {
    document.getElementById("fileContents").textContent = this.result;
    s = this.result;
  }
  fr.readAsText(this.files[0]);
})




// Shaving-off "description" part
s = s.slice(s.indexOf("#N")+"#N".length, s.length);
s = s.trim();


//Collecting the position and shape of the animals
var coord = [];
var animal = [];

while(s.lastIndexOf("#P") > 0) {
  let t = s.slice(s.lastIndexOf("#P")+"#P".length, s.length);
  s = s.slice(0, s.lastIndexOf("#P"));

  coord.push(t.slice(0, t.indexOf("\n")));
  animal.push(t.slice(t.indexOf("\n")+1, t.length));
}

// NOTE: 
//	- Ez a két ciklus pontosabb indexeléssel felül kiküszönölhető
for (var i = coord.length - 1; i >= 0; i--) {coord[i] = coord[i].trim(); }
for (var i = animal.length - 1; i >= 0; i--) {animal[i] = animal[i].trim(); }

// Translating ./* pattern into 0/1 table
let = animalShape = [];
let row = [];

for (let i=0; i < animal.length; i++) {

	for (let i = 0; i<animal[i].length; i++) {
	  if (animal[i] == "\n") {
	    animalShape.push(row);
	    row = [];
	  } else if (animal[i] == ".") {
	    row.push(0);
	  } else if (animal[i] == "*") {
	    row.push(1);
	  } else {
	    row.push(NaN);
	  }
	}

	animal[i] = animalShape;
}




