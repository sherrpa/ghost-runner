var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  spookySound.loop(true);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup = new Group()
  climbersGroup = new Group()
  invisibleBlockGroup = new Group();

  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3;
}

function spawndoors(){
  if (frameCount % 60 === 0){
    var door = createSprite(50,-100)
    door.x = Math.round(random(100,400)); 
    door.addImage(doorImg);
    door.velocityY = 3;
    door.lifetime = 200;
    doorsGroup.add(door) 
    var climber = createSprite(50,-50)
    climber.x = door.x
    climber.velocityY = door.velocityY
    climber.lifetime = 200;
    climbersGroup.add(climber)
    climber.addImage(climberImg)
    ghost.depth = door.depth
    ghost.depth += 1
    var invisibleBlock = createSprite(50,-50)
    invisibleBlock.width = climber.width
    invisibleBlock.height = 2
    invisibleBlock.x = door.x
    invisibleBlock.velocityY = climber.velocityY
    invisibleBlock.lifetime = 200;
    invisibleBlockGroup.add(invisibleBlock) 


}




}



function draw() {
  background(200);

  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 2 
  }

if(keyDown("space")){
  ghost.velocityY = -10
}

if(keyDown("right_arrow")){
  ghost.x = ghost.x +2
}

if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;
}

if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }

ghost.velocityY = ghost.velocityY  +0.8

spawndoors()

  if(tower.y > 400){
      tower.y = 300
    }
    
    drawSprites()

    if (gameState === "end"){
    fill("red");
    textSize(40);
    text("GAME OVER", 200,250)
  }

  if (gameState === "end") {
    
    tower.velocityY = 0;
    door.velocityY = 0;
    climber.velocityY = 0;
    invisibleBlockGroup.setVelocityXEach(0);
  }
}
