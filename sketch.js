var BG1, BG2, BG3;
var database;
var gameState = "play";
var bubbleImg, bubble, bubbleFX, SceneSpeed, Edges, Stream;
var coinImg, coin, coinFX, rockImg, rock, fishImg, fish, SceneImg, Scene;
var SI, startImg, start, stoneImg, stone, stoneGroup, coinGroup, buttonFX, Game_Music, logoImg, logo;
var Score = 0;
var Lives = 3;

function preload()
{

  fishImg = loadAnimation("Game_Sprites/fish_Img/fish1.png","Game_Sprites/fish_Img/fish2.png",
  "Game_Sprites/fish_Img/fish3.png","Game_Sprites/fish_Img/fish4.png");

  logoImg = loadImage("Game_Sprites/Game-Logo.png");
  Game_Music = loadSound("Sounds/Game-Music.mp3");
  buttonFX = loadSound("Sounds/ButtonFX.mp3");
  Stream = loadSound("Sounds/WaterFX.wav");
  startImg = loadImage("Game_Sprites/Start.png");
  stoneImg = loadImage("Game_Sprites/StoneImg.png");
  coinImg = loadAnimation("Game_Sprites/coin1.png","Game_Sprites/coin2.png","Game_Sprites/coin3.png",
  "Game_Sprites/coin4.png");
  coinFX = loadSound("Sounds/CoinFX.mp3");
  bubbleFX = loadSound("Sounds/BubbleFX.mp3");
  bubbleImg = loadImage("Game_Sprites/BubbleImg.png");

  // background images
  BG1 = loadImage("Game_Sprites/HomeBG.png");
  BG2 = loadImage("Game_Sprites/WaterBG.png");
  BG3 = loadImage("Game_Sprites/GameOverBG.png");

}

function setup() {
  createCanvas(800,650);
  SceneSpeed = 10;

  // scene of the game
  Scene = createSprite(width/2,-150,5,5);

  // fish
  fish = createSprite(width/2, 570, 5,5);
  fish.addAnimation("fish",fishImg);
  fish.scale = 0.6;
  fish.setCollider("rectangle",0,0, 170, 370);
  //fish.debug = true;

  // start image
  start = createSprite(width/2, height/2 + 160, 5, 5); 
  start.addImage("start", startImg);
  start.scale = 0.6;

  // Game logo
  logo = createSprite(width/2, height/2 - 100, 5,5);
  logo.addImage("logo", logoImg);
  logo.scale = 0.5;
  

  Edges = createEdgeSprites();
  stoneGroup = createGroup();
  coinGroup = createGroup();

}

function draw() {
  background("black");

  // When Game State is "Start"
  if(gameState === "start")
  {
    // Home Page
    Scene.addImage("background1",BG1);
    Scene.scale = 0.51;
    Scene.y = height/2;

    // fish
    fish.visible = false;

    // changing game state
    if(mousePressedOver(start))
    {
      gameState = "play";
      buttonFX.play();
      numState = 2;

    }


  }

  // When Game State is "Play"
  if(gameState === "play" )
  {
    console.log(frameRate());
    Score = Score + Math.round(frameRate()/60);

    // background
    Scene.addImage("background2",BG2);
    Scene.velocityY = SceneSpeed;

    // gaming music

    // reseting the background
    if(Scene.y >= 900)
    {
      Scene.y = -150;
      Scene.x = random(390,410);
    }

    fish.collide(Edges[3]);
    start.visible = false;
    logo.visible = false;
    fish.visible = true;

    // fish movement controls

    if(keyDown("left") && fish.x > 0)
    {
      fish.x -= 5;
    }

    if(keyDown(RIGHT_ARROW) && fish.x < 800)
    {
      fish.x += 5;
    }    
    
    if(keyDown(UP_ARROW) && fish.y > 200)
    {
      fish.y -= 6;
    }    
    
    if(keyDown(DOWN_ARROW) )
    {
      fish.y += 8;
    }

    // spawn bubbles
    spawnBubble();

    // spawning obctacles
    spawnStone();

    // spawning coins
    spawnCoin();

    // gaining points

    if(coinGroup.isTouching(fish))
    {
      Score = Score + 2;
      coinGroup.destroyEach();
      coinFX.play();

    }

    // failing
    if(stoneGroup.isTouching(fish))
    {
      stoneGroup.destroyEach();
      Lives = Lives - 1;
    }
    if(Lives <= 0)
    {
      fish.destroy();
      gameState = "end";
      
    }

  }

  // When Game State is "End"
  if(gameState === "end")
  {
    // background
    Scene.addImage("background3",BG3);
    Scene.velocityY = 0;
    stoneGroup.destroyEach();
    fish.destroy();
    coinGroup.destroyEach();


  }

  drawSprites();
  if(gameState === "play")
  {
    // lives
    fill("white");
    stroke("black");
    strokeWeight(4);
    textSize(25);
    text("Lives:"+ Lives, 650, 50);
    // score
    text("Score:"+ Score, 650, 80);
  }

  if(gameState === "end")
  {
    // Game Over
    fill("white");
    stroke("black");
    strokeWeight(4);
    textSize(25);
    text("Game Over",width/2, height/2);
  }

}


function spawnStone()
{
  
  if(frameCount % 100 === 0 )
  {
    stone = createSprite(random(50,750), 0, 5, 5);
    stone.addImage("obstacle", stoneImg);
    stone.scale = 0.8;
    stone.velocityY = SceneSpeed;
    stone.lifetime = Math.round(650/SceneSpeed);
    stoneGroup.add(stone);
    //stone.debug = true;
  }

}

function spawnCoin()
{
  var coinSpeed = SceneSpeed/1.3;
  if(frameCount % 130 === 0 )
  {
    coin = createSprite(random(0,800), 0, 5, 5);
    coin.addAnimation("score", coinImg);
    coin.scale = 0.8;
    coin.velocityY = coinSpeed;
    coin.lifetime = Math.round(650/coinSpeed);
    coinGroup.add(coin);
    //coin.debug = true;
  }
}

function spawnBubble()
{
  var bubbleSpeed = SceneSpeed/0.8;
  if(frameCount % 250 === 0 )
  {
    bubble = createSprite(random(0,800), 0, 5, 5);
    bubble.addImage("bubble", bubbleImg);
    bubble.scale = 0.2;
    bubble.velocityY = bubbleSpeed;
    bubble.lifetime = Math.round(650/bubbleSpeed);
    bubbleFX.play();
    
  }
}



