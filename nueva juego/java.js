//Create canvas
var canvas = document.createElement('canvas'); 
var ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src="https://github.com/lostdecade/simple_canvas_game/blob/master/images/background.png?raw=true";

//hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
  heroReady = true;
};
heroImage.src="https://github.com/lostdecade/simple_canvas_game/blob/master/images/hero.png?raw=true";

//monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
  monsterReady = true;
};
monsterImage.src="https://github.com/lostdecade/simple_canvas_game/blob/master/images/monster.png?raw=true";


var monsterReady2 = false;
var monsterImage2 = new Image();
monsterImage2.onload = function () {
  monsterReady2 = true;
};
monsterImage2.src="https://github.com/lostdecade/simple_canvas_game/blob/master/images/monster.png?raw=true";


//game objects
var hero = {
  speed: 256, //movement in pixels per second
  x: 0,
  y: 0
};
var monster = {
  x: 0,
  y: 0
};
var monstersCaught = 0;

//keyboard controls - don't understand?
var keysDown = {};

addEventListener("keydown", function(e) {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
  delete keysDown[e.keyCode];
}, false)

//reset on monster catch, put heo in center
var reset = function() {
  hero.x = canvas.width / 2;
  hero.y = canvas.height / 2;
  
  //put monster on screen randomly
  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}

//update objects
var update = function(modifier) {
  if (38 in keysDown) { //up
    if (hero.y >= 25) {
      hero.y -= hero.speed * modifier;
    }
  }
  if (40 in keysDown) { //down
    if (hero.y <= 415) {
      hero.y += hero.speed * modifier;
    }
  }
  if (37 in keysDown) { //left
    if (hero.x >= 25) {
      hero.x -= hero.speed * modifier;
    }
  }
  if (39 in keysDown) { //right
    if (hero.x <= 460) {
      hero.x += hero.speed * modifier;
    }
  }
  
  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
}

//draw everything
var render = function() {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImage, hero.x, hero.y);
  }
  if (monsterReady) {

    ctx.drawImage(monsterImage, monster.x, monster.y);
    ctx.drawImage(monsterImage, monster.x + 10 , monster.y + 10);

  }
  
  //score
  ctx.fillStyle = "rgb(250,250,250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Monsters caught: " + monstersCaught, 32, 32);
}

//game loop
var main = function() {
  var now = Date.now();
  var delta = now - then;
  
  update(delta / 1000);
  render();
  
  then = now;
  
  requestAnimationFrame(main);
}

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();

//figure out how to make it so that he can't go off canvas

function stayOnScreen() {
  if (hero.x == 510) {
    
  }
}
///nfejnklen/