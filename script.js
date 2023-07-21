class Point {
    constructor(x,y) {
	this.x = x;
	this.y = y;
    }
    show(ctx){
	ctx.lineWidth = 1;
	//ctx.moveTo(0, 0);
	//ctx.lineTo(this.x, this.y);
	//ctx.stroke();
	ctx.beginPath();
	ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
	ctx.fill();
    }
}

class Object {
    constructor(deb,fin,lineOrSurf) {
	this.deb = deb;
	this.fin = fin;
	this.type = "line";
    }
}

/*
updateKeysDown = function(e) {
    cle = e.keyCode;
    console.log(cle);
    for(i=0;i<lineOrSurf.length;i++) {
	console.log(i,lineOrSurf[i].checked);
    }
}
updateKeysUp = function(e) {
    cle = -1;
    console.log(cle);
}
document.onkeydown = updateKeysDown;
document.onkeyup = updateKeysUp;
*/

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
    let reponse = prompt("serpentins horizontaux ou verticaux et combien ? ");
    // Faites quelque chose avec la réponse
    console.log("La réponse est : " + reponse);
}

function test() {
    ctx.clearRect(0,0,h,w);
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(100, 0);
    ctx.stroke();
    ctx.closePath();
} // fin test

// ****************************************************************************
//                         EN AVANT SIMONE
// ****************************************************************************
console.log("hy");
const cnv = document.getElementById("canvas");
const h = cnv.clientHeight;
const w = cnv.clientWidth;
console.log(h,w);
const lineOrSurf = document.getElementsByName("quoi");
let x = 0;
let y = 0;
let x0 = 0;
let y0 = 0;
let cle = -1
let isdrawing = false;
const ctx = cnv.getContext("2d");
cnv.addEventListener("mousedown", (e) => {
    x = e.offsetX;
    y = e.offsetY;
    x0 = x;
    y0 = y;
    isdrawing = true;
});
cnv.addEventListener("mousemove" ,(e) =>{
    return;
    if(isdrawing === true){
        x = e.offsetX;
        y = e.offsetY;
    }
});
cnv.addEventListener("mouseup" ,(e) => {
    let line = lineOrSurf[0].checked;
    if( isdrawing === true){
	if (line) {
	    drawLine(x0, y0, e.offsetX, e.offsetY);
	    x = 0;
	    y = 0;
	}
	else {
	    poserQuestion();
	    let x1=e.offsetX,y1=e.offsetY;
	    drawLine(x0,y0,x0,y1); // vertical de (x0,y0)
	    drawLine(x0,y1,x1,y1); // horizontal
	    drawLine(x1,y1,x1,y0); // vertical
	    drawLine(x1,y0,x0,y0); // horizontal
	}
        isdrawing = false;
    }
});
