var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var ground, invisibleGround, groundImage;

var bananasGroup, bananaImage;
var obstaclesGroup, obstacleImage;

var score;

function preload(){
  monkey_running = loadAnimation('sprite_0.png','sprite_1.png','sprite_2.png','sprite_4.png','sprite_5.png','sprite_6.png','sprite_7.png','sprite_8.png');
  
  obstacleImage = loadImage("obstacle.png");
  
  bananaImage = loadImage("banana.png");
}

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  console.log(ground.x);

  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  score = 0;
  
}

function draw() {
  
  background('white');
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
   monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
    monkey.collide(ground);
  
   bananas();
  obstacles();

    drawSprites();
  
  if(obstaclesGroup.isTouching(monkey)){
    
    ground.velocityX = 0;
    monkey.velocityY = 0;
  }
  stroke('black');
  textSize(20);
  fill('black');
  survivalTime = Math.ceil(frameCount/frameRate())
  text('Survival Time: '+ survivalTime, 100, 50);
}
  
function bananas() {
  if (frameCount % 80 === 0){
    var rand = Math.round(random(120,200));
    var banana = createSprite(600,180,40,10);
    banana.addImage(bananaImage);
    banana.velocityX = -4;
    banana.lifetime = 150;
    banana.scale = 0.1;
    bananasGroup.add(banana);
  }
}

function obstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,320,10,40);
   obstacle.addImage(obstacleImage);
   obstacle.velocityX = -(6 + score/100);
   
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
 }


  

}