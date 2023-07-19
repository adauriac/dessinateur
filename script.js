console.log("hy");
const cnv = document.getElementById("canvas");
const quoi = document.getElementsByName("quoi");

var x = 0;
var y = 0;
var x0 = 0;
var y0 = 0;
const XX = [];
const YY = [];
var cle = -1

updateKeysDown = function(e) {
    cle = e.keyCode;
    console.log(cle);
    for(i=0;i<quoi.length;i++) {
	console.log(i,quoi[i].checked);
    }
}
updateKeysUp = function(e) {
    cle = -1;
    console.log(cle);
}
document.onkeydown = updateKeysDown;
document.onkeyup = updateKeysUp;

var isdrawing = false;
//const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
cnv.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    x0 = x;
    y0 = y;
    isdrawing = true;
    XX.length = 0;
    YY.length = 0;
    //YY = [];

});
cnv.addEventListener("mousemove" ,(e) =>{
    if(isdrawing === true){
        if (0) drawLine(x0, y0, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
	XX.push(x);
	YY.push(y);
    }
});
cnv.addEventListener("mouseup" ,(e) => {
    var line = quoi[0].checked;
    if( isdrawing === true){
	if (line) {
	    drawLine(x0, y0, e.offsetX, e.offsetY);
	    x = 0;
	    y = 0;
	}
	else {
	    poserQuestion();
	    var x1=e.offsetX,y1=e.offsetY;
	    drawLine(x0,y0,x0,y1); // vertical de (x0,y0)
	    drawLine(x0,y1,x1,y1); // horizontal
	    drawLine(x1,y1,x1,y0); // vertical
	    drawLine(x1,y0,x0,y0); // horizontal
	}
        isdrawing = false;
    }
});
function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function eraseLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
function poserQuestion() {
    var reponse = prompt("serpentins horizontaux ou verticaux et combien ? ");
    // Faites quelque chose avec la réponse
    console.log("La réponse est : " + reponse);
}
