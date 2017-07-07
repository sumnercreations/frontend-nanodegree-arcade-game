// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

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
    var canvasElement = document.getElementsByTagName('canvas');
    var canvas = canvasElement[0];

    this.x += this.speed * dt;

    if(this.x >= canvas.width) {
        this.x = 0;
    }

    checkCollision(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    // update the player position?
}

Player.prototype.render = function() {
    //  draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(key) {
    // move the player in the direction given
    if (key == 'left') {
        player.x -= player.speed;
    }
    if (key == 'up') {
        player.y -= player.speed - 20;
    }
    if (key == 'right') {
        player.x += player.speed;
    }
    if (key == 'down') {
        player.y += player.speed - 20;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(202, 383, 100);
var score = 0;
var gameLevel = 1;
var scoreSpan = document.getElementById("score");
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

var checkCollision = function(anEnemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= anEnemy.y + 90
        && player.x + 25 <= anEnemy.x + 88
        && player.y + 73 <= anEnemy.y + 135
        && player.x + 76 >= anEnemy.x + 11) {
        player.x = 202;
        player.y = 383;
        score -= 1;
        updateScore();
    }

    // check for player reaching top of canvas and completing the level
    // if player completes the level, add 1 to the score and level
    // pass score as an argument to the levelUp function
    if (player.y + 63 <= 0) {
        player.x = 202;
        player.y = 383;

        // When the player hits the top "clear" canvas so the chars
        // head doesn't remain at the top of the canvas.
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);

        gameLevel += 1;
        score += 10;
        updateScore();
        levelUp(gameLevel);
    }

    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383) {
        player.y = 383;
    }
    if (player.x > 402) {
        player.x = 402;
    }
    if (player.x < 2) {
        player.x = 2;
    }
};

var updateScore = function() {
    var scoreSpan = document.getElementById("score");
    scoreSpan.innerHTML = score;
}

// Make the next level more difficult by increasing
// the number of enemies equal to the level they are on.
var levelUp = function(_enemies) {
    // Don't like the alert... would like something less jarring though...
    // alert("Congrats! You have leveled up!");
    // update the UI to display the new level
    var levelSpan = document.getElementById("level");
    levelSpan.innerHTML = gameLevel;
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i < _enemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
}

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
