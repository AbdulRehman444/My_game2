var bg,bgImg;
var player, shooterImg, shooter_shooting;
var lion, lionImg,lionsGroup, bearImg, bearsGroup
var bullet, bulletImg, bulletsGroup
var Score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  lionImg = loadImage("assets/lion.png")
  bearImg =loadImage("assets/bear.png")
  bulletImg =loadImage("assets/bullet.png")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale =1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  

  lionsGroup = new Group();
  bearsGroup = new Group();
  bulletsGroup=new Group();
// lion.addImage(lionImg)
// bear.addImage(bearImg)

}

function draw() {
  background(0); 

spawnLions();
spawnBears();

// fontColor("white")
// textSize(20);
// text("Score:"+Score,400,30); 

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-18
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+18
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  createBullet();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

if(lionsGroup.isTouching(bulletsGroup)){
  lionsGroup.destroyEach();
  bulletsGroup.destroyEach();
}
if(bearsGroup.isTouching(bulletsGroup)){
  bearsGroup.destroyEach();
  bulletsGroup.destroyEach();
}

drawSprites();

}

function spawnLions() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var lion = createSprite(displayWidth-0,120,40,10);
    lion.y = Math.round(random(80,400));
    lion.addImage(lionImg);
    lion.scale = 0.4;
    lion.velocityX = -20;
    
     //assign lifetime to the variable
    lion.lifetime = 200;
    
    //adjust the depth

    //add each cloud to the group
    lionsGroup.add(lion);
  }
}

function spawnBears() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var bear= createSprite(displayWidth-0,Math.round(random(20,600)),40,10);
    // bear.y = Math.round(random(80,400));
    bear.addImage(bearImg);
    bear.scale = 0.6;
    bear.velocityX = -18;
    
     //assign lifetime to the variable
    bear.lifetime = displayWidth;
    
    //adjust the depth

    //add each cloud to the group
    bearsGroup.add(bear);
  }
}

function createBullet(){
  var bullet=createSprite(displayWidth-1150, displayHeight-300, 50, 50)
  bullet.addImage(bulletImg)
  bullet.velocityX=30
  bullet.scale=0.3
  bullet.y = player.y;
  bullet.lifetime =300;
  bulletsGroup.add(bullet)

  
}