// Enemies our player must avoid
var Enemy = function(x, y) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = x;
  this.y = y;
  this.minSpeed = 25;
  this.maxSpeed = 300;
  this.speed = getRandomInRange(this.minSpeed, this.maxSpeed);
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.calcNewPosition(dt);
  this.checkCollision();
};

Enemy.prototype.calcNewPosition = function (dt) {
  // If the enemey gets to the other side of the screen 
  // then reset the position back to the start
  var points = player.returnPoints();
  if (this.x > 500) {
    this.x = -60;
    // Calc new starting speed in a specific range. 
    // As points go up the faster, on average, the enemies will travel
    this.speed = getRandomInRange(this.minSpeed + points, this.maxSpeed + points);
  } else {
    this.x =  this.x + this.speed * dt;
  }
};

Enemy.prototype.checkCollision = function () {
  // Check to see if the player is on the same y axis as an enemy 
  // and if he is within 75 of the enemey's front or back
  if (this.y == player.y && player.x - this.x < 75 && this.x - player.x < 75 ){
    player.resetPosition();
    // Reduce points by 25 if player gets hit
    player.points -= 25;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
  this.resetPosition();
  // The image/sprite for the player
  this.sprite = 'images/char-boy.png';
  // Set new game to 0 points
  this.points = 0;
};
Player.prototype.update = function(dt) {
  // Updates points scoreboard
  document.getElementsByClassName('scoreboard')[0].innerHTML = 'Points: ' + this.points;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles movement of player
Player.prototype.handleInput = function(key) {
  var horizontalMove = 100;
  var verticalMove = 85;  
  // includes logic built-in so player doesn't go out of screen
  if (key == 'left' && this.x - horizontalMove >= 0){
    this.x -= horizontalMove;
  } else if (key == 'right' && this.x + horizontalMove <= 400){
    this.x += horizontalMove;
  } else if (key == 'up' && this.y - verticalMove >= 50){
    this.y -= verticalMove;
  } else if (key == 'down' && this.y + verticalMove <= 400){
    this.y += verticalMove;
  } else if (key == 'up' && this.y - verticalMove <= -35){
    this.win();
  }
};

// if player touches water then add 50 points and move off screen
Player.prototype.win = function() {
  this.points +=  50;
  this.resetPosition();
};

Player.prototype.resetPosition = function() {
  this.y = 390;
  this.x = 200;
};

// returns 0 or the real points, whichever is greater. 
// If points go negative then the enemies will start to go backward so this prevents that
Player.prototype.returnPoints = function() {
  var points = 0;
  if (player.points > 0){
    points = player.points;
  }
  return points;
};

var getRandomInRange = function (min, max) {
  return Math.random() * (max - min) + min;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy(-60, 50 + 85 * i));
}

var player = new Player();