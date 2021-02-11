const p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var bt = document.getElementById("bt");
var bt2 = document.getElementById("bt2");
var scene = document.getElementById("scene");
var live1 = document.getElementById("live1");
var live2 = document.getElementById("live2");
var live3 = document.getElementById("live3");
var button = document.getElementById("be");
var score = document.getElementById("score");
var cont = document.getElementById("cont");
var play = document.getElementById("play");
var scoren = 0;
var top;
var tries = 1.5;
var coll1;
var theme = new Audio("/theme.mp3");
theme.preload = 'auto';



var l = 3600;
var dead = 1

function playtheme(){
theme.play()
}


  
  
  

  
  
  
function up() {
  if(dead == 0){
    
var br = parseInt(p1.style.top);
if(br <0 ){
  return;
}else{
 let topp = window.getComputedStyle(p1).getPropertyValue("top");
let rtop = parseInt(topp);
rtop = rtop - 12;
p1.style.top = rtop + 'px';
top = parseInt(rtop);
}
}
}


function down() {
  if(dead == 0){
var br2 = parseInt(p1.style.top);
if(br2 >= 300-25 ){
  return;
}else{
topp = window.getComputedStyle(p1).getPropertyValue("top");
 top = parseInt(topp);
 let rtop = parseInt(topp);
rtop = rtop + 12;
top = parseInt(rtop);
p1.style.top = rtop + 'px';

}
}
}








//bt.addEventListener('touchstart',up())
//bt.addEventListener('click',down())


be.addEventListener('touchstart',_.throttle(shoot,500))



function shoot(){
  if(dead == 0){

let posX = 29;
let posY = parseInt(window.getComputedStyle(p1).getPropertyValue("top")) + 25/2 - 3/2 ;
let laser = document.createElement("DIV");
laser.classList.add("laser");
scene.appendChild(laser);
laser.style.left = posX + "px";
laser.style.top = posY + "px";
fookingmove(laser);
}
}


function fookingmove(laser){
  let lasetInt = setInterval(()=>{
  let lmao = parseInt(laser.style.left);
  var monsters= document.querySelectorAll(".enemy");
  monsters.forEach(monster=>{
    var laserLeft = parseInt(laser.style.left)
var laserTop = parseInt(laser.style.top)
var laserBottom = laserTop - 3;
var monsterTop = parseInt(monster.style.top)
var monsterBottom = monsterTop +10
var monsterLeft = parseInt(monster.style.left)
    if(laserLeft <400 && monsterLeft < laserLeft + 15 &&
   monsterLeft + 30 > laserLeft &&
   monsterTop < laserTop + 3 &&
   monsterTop + 30> laserTop && !laser.classList.contains("dead") && !monster.classList.contains("dead")){
     
     
      laser.remove()
      monster.remove()
      monster.classList.add("dead");
      laser.classList.add("dead");
      scoren++;
      score.innerText = scoren;
    }
  });
    if(lmao >400){
      laser.remove();
    }else{
      laser.style.left = (lmao + 4) + "px";
    }
   
  },17);
}






var interval;
bt2.addEventListener("touchstart", function() {
  fire();
  interval = setInterval(fire, 50);
});


function fire() {
  up();
}


bt2.addEventListener("touchend", function() {
  if (interval ) {
    clearInterval(interval );
  }
});

var interval2; 
bt.addEventListener("touchstart", function() {
  fireFunction();
  interval2 = setInterval(fireFunction, 50);
});

function fireFunction() {
  down();
}


bt.addEventListener("touchend", function() {
  if (interval2 ) {
    clearInterval(interval2 );
  }
});


function spawnEnemy(){
  if(dead == 0){
setTimeout(function() {
let X = 430;
let Y = Math.floor(Math.random()*275) + 2;
let enemy = document.createElement("DIV");
enemy.classList.add("enemy");
scene.appendChild(enemy);
enemy.style.left = X + "px";
enemy.style.top = Y + "px";
if(l >1400){
l = l-50;
}
move(enemy);
spawnEnemy();
  }, l);
}
}

var lo = 3.1
function move(enemy){
  
  if(dead == 0){
 let enemyInt = setInterval(()=>{
  let lmao = parseInt(enemy.style.left);
    if(lmao<0){
      enemy.remove();
    }else{
      
      enemy.style.left = (lmao - lo) + "px";
    }
  },17);
 var check = setInterval(() =>{
    let lmao = parseInt(enemy.style.left);
    if(enemy){
    if(lmao < 0 && !enemy.classList.contains("dead")){
      tries= tries - 0.5;
      console.log(tries);
      new Audio("/hit.wav").play()
    }
    if(lmao <0){
      clearInterval(check);
    }
    }
    if(tries ==0){
      console.log("game over");
    }
    if(tries ==1){
      live1.style.visibility = "hidden";
    }
    if(tries ==0.5){
      live1.style.visibility = "hidden";
      live2.style.visibility = "hidden";
    }
    if(tries ==0){
      live1.style.visibility = "hidden";
      live2.style.visibility = "hidden";
      live3.style.visibility = "hidden";
      dead = 1;
      theme.pause();
      theme.currentTime=0;
       play.style.display ="block"
  cont.style.display = "none"
    }
  }, 500);
  }
}

//var run =setInterval("spawnEnemy()",l);

//run;




be.addEventListener("touchstart", function() {
  be.style.backgroundImage = "url(pushed.png)"
})
be.addEventListener("touchend", function() {
be.style.backgroundImage = "url(button.png)"
})


bt.addEventListener("touchstart", function() {
  bt.style.backgroundImage = "url(moveP.png)"
})
bt.addEventListener("touchend", function() {
bt.style.backgroundImage = "url(move.png)"
})


bt2.addEventListener("touchstart", function() {
  bt2.style.backgroundImage = "url(moveP.png)"
})
bt2.addEventListener("touchend", function() {
bt2.style.backgroundImage = "url(move.png)"
})






if(dead ==1){
  play.style.display ="block"
  cont.style.display = "none"
}else{
  cont.style.display = "block"
  play.style.display = "none"
}

function start(){
l = 3600
cont.style.display = "block"
  play.style.display = "none"
  dead = 0;
  tries = 1.5
  live1.style.visibility = "visible";
      live2.style.visibility = "visible";
      live3.style.visibility = "visible";
      l=4000
      spawnEnemy()
      playtheme()
      scoren = 0
      score.innerText = scoren
}

