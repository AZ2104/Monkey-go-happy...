var bgImage,bg;
var me, me_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var survivalTime =0;


function preload(){
  bgImage=loadImage("jungle2.jpg");
  me_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  bg=createSprite(0,0,800,400);
  bg.addImage(bgImage);
  bg.scale=1.5;
  bg.x=bg.width/2;
 bg.velocityX=-4;
  
  me = createSprite(100,340,20,50);
  me .addAnimation("Running",me_running);
  me .scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  survivalTime =0;
}

function draw() {
  
  survivalTime =survivalTime + Math.round(getFrameRate()/60);
 
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(bg.x<100){
    bg.x=bg.width/2;
  }
  
    if(FoodGroup.isTouching(me)){
      FoodGroup.destroyEach();
    score = score + 10;
    }
    switch(score){
        case 10: me.scale=0.12;
                break;
        case 20: me.scale=0.14;
                break;
        case 30: me.scale=0.16;
                break;
        case 40: me.scale=0.18;
                break;
        default: break;
    }
  
   
    if(keyDown("space") ) {
      me.velocityY = -12;
    }
    me.velocityY = me.velocityY + 0.8;
  
    me.collide(ground);
    spawnFood();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(me)){ 
        me.scale=0.08;
     
    
    }
  
  drawSprites();
  
  stroke("Red");
  textSize(20);
  fill("Red");
  text("Score: "+ score, 500,50);
  
  stroke("purple");
    fill("purple");
      textSize(20);
  
  text("Survival Time:"+  survivalTime,50,50);
}

function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 100 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
     //assign lifetime to the variable
    banana.lifetime = 300;
    me.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
       
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}


  
