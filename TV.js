Status = "";
TV_image = "";
objects = [];

function preload(){
    TV_image = loadImage("TV.avif");
}
function setup(){
    canvas = createCanvas(640, 350);
    canvas.position(400,250);
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects.";
}
function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    objectDetector.detect(TV_image, gotResults);
}
function gotResults(error, results){
    if(error){
       console.log(error);
    }
    console.log(results);
    objects = results; 
}
function draw(){
    image(TV_image,0,0,640,350);
    if(Status != ""){
        for(i = 0; i<objects.length; i++)
        {
           document.getElementById("status").innerHTML = "Status: Objects detected.";
           fill("#FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        } 
     }
}