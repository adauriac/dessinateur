/*
  The set of deplacement of the robot is the Trajectory
  It is made of TrajectoryPiece. A TrajectoryPiece has a beginning and
  an ending point and several parametes stored in an array to describe it.
  A Trajectory is an array of TrajectoryPiece such that the beginning point
  of the ith TrajectoryPiece is the ending point of the (i-1)th TrajectoryPiece.

  The Trajectory is shown on the screen and the user click on a point which
  is the ending point of the new TrajectoryPiece. 
  i) The user is prompted for the parameters of the new TrajectoryPiece, or alternatively 
  ii) the user hit a key  while clicking. This key decides the type of the TrajectoryPiece or
  iii) on the screen input fields let the user choos ethe parameters of TrajectoryPiece

  The Trajectory is maintened, and when a new TrajectoryPiece is pushed the canvas is
  erased and the whole new Trajectory is shown

*/
class Point {
    constructor(x,y) {
	this.x = x;
	this.y = y;
    }
    show(ctx){
	ctx.lineWidth = 1; 
	ctx.beginPath();
	ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
	ctx.fill();
    }
}

class TrajectoryPiece {
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
	fin.show(ctx);
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
}     // FIN class TrajectoryPiece {
// ******************************************************************************

class Trajectory {
    constructor() {this.itineraire = [];}
    push(o) {this.itineraire.push(o);}
    logConsole(){
	for(let i=0;i<this.itineraire.length;i++)
	    this.itineraire[i].logConsole();
    } // FIN nconstructor()
    draw() {
	console.log("entering Trajectory.draw() with h,w=",h,w)
	ctx.clearRect(0,0,h,w);
	for(let i=0;i<this.itineraire.length;i++) {
	    this.itineraire[i].draw();
	} // FIN draw()
    }
    length() {
	return this.itineraire.length;
    }
}     // FIN class Trajectory {
// ******************************************************************************

function drawLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}     // FIN function drawLine(x1, y1, x2, y2){
// ******************************************************************************

function drawLineP(P0,P1){
    console.log("from ",P0.x,P0.y," to ",P1.x,P1.y);
    drawLine(P0.x,P0.y,P1.x,P1.y);
}     // FIN function drawLineP(P0,P1){
// ******************************************************************************

function eraseLine(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1.1;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}
// ******************************************************************************

function poserQuestion() {
    // questionne jusqu'a avoir comme reponse : [H/V] %d
    // ou l'entier est positif
    // retourne |n| si horizontal, -|n| si vertical
    let cas = "?";
    let n = 0;
    while (1) {
	let reponse = prompt("zigzag horizontaux ou verticaux et combien ? format: [H/V] n>=0");
	const myArray = reponse.split(" ");
	if ((myArray[0] !="H") && (myArray[0] != "V") )
	    continue;
	cas = myArray[0];
	n = parseInt(myArray[1],10);
	if (isNaN(n))
	    continue;
	if (n<0)
	    continue
	if (cas == "V")
	    n = -n; 
	break;
    }
    return n;
}     // FIN function poserQuestion() {
// ******************************************************************************

function test() {
    itin.logConsole();
    itin.draw();
    return;
} // FIN test()
// ****************************************************************************

function onMouseUpAddNewPiece(e) {
    let x1 = e.offsetX, y1 = e.offsetY;
    let line = lineOrSurf[0].checked;
    let P0 = new Point(x0,y0);
    let P1 = new Point(x1,y1);
    P1.show(ctx);
    let myO = new TrajectoryPiece(P0,P1,line);
    myO.logConsole();
    itin.push(myO);
    if (line) {
	drawLine(x0, y0, x1, y1);
    }
    else {
	let n = poserQuestion();  // le signe de n indique en X ou en Y
	console.log(n);
	if (n>0)
	    barbouilleH(P0,P1,n);
	else
	    barbouilleV(P0,P1,-n);
    }
    x0 = x1;
    y0 = y1;
}     // FIN function oneMousUpAddNewPiece(e) {
// ****************************************************************************

function barbouilleH(P0,P1,n) {
    // zig zag horizontaux : n parcours dans sens inverse
    let x0= P0.x;
    let y0= P0.y;
    let x1= P1.x;
    let y1= P1.y;
    if (n==0) {
	drawLine(x0,y0,x1,y0);
	drawLine(x1,y0,x1,y1);
	return;
    }
    let Dy = (y0-y1)/(2.0*n);
    let yCur = y0;
    drawLine(x0,y0,x1,yCur);
    console.log(x0,y0,x1,yCur);
    for(let i=0;i<n;i++) {
	drawLine(x1,yCur,x1,yCur-Dy);
	drawLine(x1,yCur-Dy,x0,yCur-Dy);
	drawLine(x0,yCur-Dy,x0,yCur-2*Dy);
	drawLine(x0,yCur-2*Dy,x1,yCur-2*Dy);
	yCur -= 2*Dy;
    }
}     // FIN function barbouilleH(P0,P1) {
// ****************************************************************************

function barbouilleV(P0,P1,n) {
    // zig zag horizontaux : n parcours dans sens inverse
    let x0= P0.x;
    let y0= P0.y;
    let x1= P1.x;
    let y1= P1.y;
    if (n==0) {
	drawLine(x0,y0,x0,y1);
	drawLine(x0,y1,x1,y1);
	return;
    }
    let Dx = (x0-x1)/(2.0*n);
    let xCur = x0;
    drawLine(x0,y0,xCur,y1);
    console.log(x0,y0,xCur,y1); // X cst vertical
    for(let i=0;i<n;i++) {
	drawLine(xCur,y1,xCur-Dx,y1);         // Y cst horizontal 
	drawLine(xCur-Dx,y0,xCur-Dx,y1);      // 
	drawLine(xCur-Dx,y0,xCur-2*Dx,y0);
	drawLine(xCur-2*Dx,y0,xCur-2*Dx,y1);
	xCur -= 2*Dx;
    }
}     // FIN function barbouilleV(P0,P1) {
// ****************************************************************************

function onMouseUpRedraw(e) {
    // may-be usefull sometime
    let x1 = e.offsetX, y1 = e.offsetY;
    let line = lineOrSurf[0].checked;
    let myO = new TrajectoryPiece( new Point(x0,y0),new Point(x1,y1),line);
    myO.logConsole();
    x0 = x1;
    y0 = y1;
    itin.push(myO);
    itin.draw();
}     // FIN function oneMousUpRedraw(e) {
// ****************************************************************************

function telechargerFichier(nomFichier, contenu) {
    // from chatgpt
    const elementLien = document.createElement('a');
    elementLien.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(contenu));
    elementLien.setAttribute('download', nomFichier);
    elementLien.style.display = 'none';
    document.body.appendChild(elementLien);
    elementLien.click();
    document.body.removeChild(elementLien);
}  // FIN function telechargerFichier(nomFichier, contenu) {
// *****************************************************************************

function onSave(){
    // the Trajectory is encoded in a string which is saved in a file on the disk
    let ans = "il y a ";
    ans += itin.length();
    ans += "pieces\n";
    console.log(ans);
    telechargerFichier("premierExample",ans);
}     // FIN onSave()
// *****************************************************************************

function onLoad(){
 document.getElementById("inputFile").click();   // pour choisir line par defautœ 
}     // FIN onLoad()
// *****************************************************************************

// ****************************************************************************
//                         EN AVANT SIMONE
// ****************************************************************************
console.log("hy");

const contenuFichier = "Ceci est le contenu du fichier à sauvegarder.";
//telechargerFichier("inputFile", contenuFichier)
/*
//from chatgpt
document.getElementById('inputFile').addEventListener('change', function() {
    const file = this.files[0]; // Récupère le premier fichier sélectionné 
    if (file) {
	const reader = new FileReader();
	reader.onload = function(event) {
	    const contenuFichier = event.target.result;
	    // Faites quelque chose avec le contenu du fichier (par exemple, l'afficher dans la console)
	    console.log(contenuFichier);
	};
	reader.readAsText(file);
    }
});
*/
const inputElement = document.getElementById('inputFile');
const cnv = document.getElementById("canvas");
const h = cnv.clientHeight;
const w = cnv.clientWidth;
console.log(h,w);
const lineOrSurf = document.getElementsByName("quoi");
document.getElementById("line").click();   // pour choisir line par defaut
let x = 0;
let y = 0;
let x0 = 0;
let y0 = 0;
let cle = -1
const ctx = cnv.getContext("2d");
const itin = new Trajectory();
P0 = new Point(x0,y0)
P0.show(ctx);
/*
  cnv.addEventListener("mousedown", (e) => {});
  cnv.addEventListener("mousemove" ,(e) => {});
*/
cnv.addEventListener("mouseup",onMouseUpAddNewPiece);
// other possibility cnv.addEventListener("mouseup",onMouseUpRedraw);


