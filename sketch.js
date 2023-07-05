var gameState = "start",number;
var startState, clone, bgImage, bg, ghost, turtleImg, enemyImg, enemy, kale, kaleImg, fish, fishImg;
var kaleScore = 0, turtleLife = 3;
var bgMusic

function preload() {
  bgImage = loadImage("images.png")
  turtleImg = loadImage("turtle.png")
  enemyImg = loadImage("enemy1.png")
  kaleImg = loadImage("kale.png")
  fishImg = loadImage("fish-removebg-preview (1).png")
  bgMusic = loadSound("background_music.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  startState = new StateChange();

  bg = createSprite(windowWidth / 2, windowHeight / 2);
  bg.addImage("infinite bg", bgImage);
  bg.scale = 8;

  clone = createSprite(100, windowHeight / 2 - 100)
  clone.shapeColor = "blue"
  clone.scale = 0.35
  clone.visible = false;
  clone.addImage(turtleImg);
  //clone.debug = true;
  clone.setCollider("rectangle", 0, 0, 150, 170)

  fish = createSprite(windowWidth -200, windowHeight / 2 - 25);
  fish.addImage(fishImg);
  fish.visible = false;
  fish.scale = 0.4;

  enemyGroup = new Group();

  kaleGroup = new Group();
  

}

function draw() {
  background(0);
  drawSprites();

  if(!bgMusic.isPlaying()){
      bgMusic.play()
  }

  //THE MOUSE CURSOR
  // fill("white");
  // text(mouseX + "," + mouseY, mouseX, mouseY);

  textSize(40);
  fill ("orange");
  text("Kale Consumed: "  + kaleScore , windowWidth - 400 , 60);
  text("Life Remaining: "  + turtleLife , windowWidth/2 - 100 , 60);

  if (gameState === "start") {
    startState.display();
  }
  if (gameState == "play") {

    
    clone.visible = true;
    bg.velocityX = -3;
   
    fish.visible = true;

    createEnemyLevel1();
   

    //infinite bg
    if (bg.x < windowWidth / 2 - 100) {
      bg.x = windowWidth / 2;
    }

    //player control
    if (keyIsDown(UP_ARROW)) {
      clone.y = clone.y - 3.75
    }
    if (keyIsDown(DOWN_ARROW)) {
      clone.y = clone.y + 3.75
    }
    if (keyIsDown(LEFT_ARROW)) {
      clone.x = clone.x - 3.75
    }
    if (keyIsDown(RIGHT_ARROW)) {
      clone.x = clone.x + 3.75
    }

    //Resetting the clone to it's initial position
    if (enemyGroup.isTouching(clone)) {
      clone.x = 100;
      clone.y = windowHeight / 2 - 100;
      turtleLife = turtleLife -1;
      
    }

    if(turtleLife <=0){
      gameState="over"
    }

    createKale();

    if ( kaleGroup.isTouching(clone)) {
      kaleGroup[0].destroy();
      kaleScore = kaleScore + 5;
    }

    if(kaleScore == 50){
     gameState = "level2"
    }

  }

  if(gameState === "level2"){
    createEnemyLevel1();
  }

  if(gameState === "over"){
    
  }
}

//NPC
function createEnemyLevel1() {
  if (frameCount % 30 == 0) {
    enemy = createSprite(random(windowWidth / 2 - 400, windowWidth / 2 + 600), windowHeight / 2 - 300)
    enemy.addImage(enemyImg)
    enemy.scale = 0.45
    enemy.velocityY = 5;
    enemy.lifetime = windowHeight / 5;
    //enemy.debug = true;
    enemyGroup.add(enemy);
  }
} 

function createKale(){

  if(frameCount% 200 ===0){
    kale = createSprite(random(60,windowWidth - 100), (60,windowHeight-200))
    kale.addImage(kaleImg);
    kale.scale = 0.35;
    kaleGroup.add(kale);
  }
  
  
}

