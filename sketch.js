//UDANT KANDARPA
//UNIVARSAL CANVAS

var clear;
var stroke1,stroke2,stroke3,stroke4;
var pointer;
var drawing = [];
var currentPath = [];
var values;
var dbdrawing = [];
var j=0,k=0;

function setup(){
  canvas = createCanvas(400,400);
  canvas.mousePressed(startPath);
  database = firebase.database();
  values = database.ref("screen/mouse");
  clear = createButton('Restart Drawing');
  clear.mousePressed(clearDrawing)
 /* clear.x = 100;
  clear.y = 100;*/
}

function startPath() {
  currentPath=[];
  drawing.push(currentPath);
  database.ref("screen/mouse").set(drawing);
  }
function displaydb() {
  database.on();
}

function clearDrawing() {
    drawing = [];
    console.log("cleared drawing");
    database.ref("screen/mouse").set(drawing);
    
}


function readPosition(data) {
  dbdrawing = data.val();
 // console.log(dbdrawing);
  //console.log(dbpath);
 if (dbdrawing!=null  ){
   //   console.log("dbdrawing "+ dbdrawing.length);
      for (var i = 0; i < dbdrawing.length; i++) {
        var dbpath = dbdrawing[i];
        if(dbpath!=null){
            beginShape();
            for (var j = 0; j < dbpath.length; j++) {
              vertex(dbpath[j].x,dbpath[j].y) ;   
            }
            endShape(); 
        }
}
} 
  
  
}
function update(state){
  database.ref("/").update({
      gameState: state
  });
}
function draw(){
  background(0);
  
 
 
  
 
  

  if (mouseIsPressed) {
    var point = {
      x: mouseX,
      y: mouseY,
   }

   
   
  currentPath.push(point);
  }
  stroke(255);
  
  noFill();

  strokeWeight(5)
  
  
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
  

    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x,path[j].y) ;   
    }
    endShape(); 
  }
 
  values.on("value",readPosition); 
 
  drawSprites();
}