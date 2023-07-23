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
	this.type = lineOrSurf;
    }
    logConsole() {console.log("from ",this.deb.x,this.deb.y," to ",this.fin.x,this.fin.y," line=",this.type);}
    draw() {
	let line = this.type;
	let deb = this.deb
	let fin = this.fin;
	let x0 = deb.x;
	let y0 = deb.y;
	let x1 = fin.x;
	let y1 = fin.y;
	if (line) 
	    drawLine(x0, y0, x1, y1);
	else {
	    drawLine(x0,y0,x0,y1); // vertical de (x0,y0)
	    drawLine(x0,y1,x1,y1); // horizontal
	    drawLine(x1,y1,x1,y0); // vertical
	    drawLine(x1,y0,x0,y0); // horizontal
	}
    }
} // fin class Object {

class Itineraire {
    constructor() {this.itineraire = [];}
    push(o) {this.itineraire.push(o);}
    logConsole(){
	for(let i=0;i<this.itineraire.length;i++)
	    this.itineraire[i].logConsole();
    }
    draw() {
	ctx.clearRect(0,0,h,w);
	for(let i=0;i<this.itineraire.length;i++)
	    this.itineraire[i].draw();
    }
} // fin class Itineraire {

/*
updateKeysDown = function(e) { cle = e.keyCode; console.log(cle);}
updateKeysUp = function(e) { cle = -1;}
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
    itin.logConsole();
    itin.draw();
    return;
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
const ctx = cnv.getContext("2d");
const itin = new Itineraire();
/*
cnv.addEventListener("mousedown", (e) => {});
cnv.addEventListener("mousemove" ,(e) => {});
*/
cnv.addEventListener("mouseup" ,(e) => {
    let x1 = e.offsetX, y1 = e.offsetY;
    let line = lineOrSurf[0].checked;
    let myO = new Object( new Point(x0,y0),new Point(x1,y1),line);
    myO.logConsole();
    itin.push(myO);
    if (line) {
	drawLine(x0, y0, x1, y1);
    }
    else {
	poserQuestion();
	drawLine(x0,y0,x0,y1); // vertical de (x0,y0)
	drawLine(x0,y1,x1,y1); // horizontal
	drawLine(x1,y1,x1,y0); // vertical
	drawLine(x1,y0,x0,y0); // horizontal
    }
    x0 = x1;
    y0 = y1;
});
