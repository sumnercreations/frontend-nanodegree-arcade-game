// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // There are 3 rows for enemies
    // Rows from top to bottom
    // 1: pos y = 65
    // 2: pos y = 145
    // 3: pos y = 225
    var y_positions = [65, 145, 225];
    this.width = 85;
    this.height = 50;
    this.speed = Math.random() * 256;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -150;
    this.y = y_positions[Math.floor(Math.random() * y_positions.length)];
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

    // move the enemy across the map
    this.x += this.speed * dt;

    // once the enemy reaches the edge of the canvas, reset position to start
    if(this.x >= canvas.width) {
        this.x = 0;
    }

    // 3. If player occupies same space as enemy doc a point
    //    and reset the player to start position
    // character and enemy px dimensions are: 101 x 171
    if(
        player.x < this.x + this.width &&
        player.x + player.width > this.x &&
        player.y < this.y + this.height &&
        player.y + player.height > this.y
    ) {
        // remove 1 point
        updateScore(-1);
        // reset the player
        player.x = 202;
        player.y = 405;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 85;
    this.height = 50;
    // there are 5 possible player images.
    // Ideally I would like to allow them to choose,
    // but for now, let's just randomly select one.
    // var characterSprites = [
    //     'images/char-boy.png',
    //     'images/char-cat-girl.png',
    //     'images/char-horn-girl.png',
    //     'images/char-pink-girl.png',
    //     'images/char-princess-girl.png'
    // ];
    // this.sprite = characterSprites[Math.floor(Math.random() * characterSprites.length)];
    // For some reason, only the char-boy works. I don't have time to look into that further
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(direction) {
    var canvasElement = document.getElementsByTagName('canvas');
    var canvas = canvasElement[0];

    // 1. Player can not leave the canvas
    // 2. When player reaches the top, they win.
    switch(direction) {
        case 'left':
            // 1. can't go off the canvas on the left.
            if(player.x - 100 < 2) {
                player.x = 2;
            }else{
                player.x -= 100;
            }

            if(player.y < 65) {
                cleanCanvas();
            }
            break;
        case 'right':
            // 1. can't go off the canvas on the right.
            if(player.x + 100 > 402) {
                player.x = 402;
            }else{
                player.x += 100;
            }

            if(player.y < 65) {
                cleanCanvas();
            }
            break;
        case 'up':
            // 2. if they reach the top they win.
            player.y -= 85;
            if(player.y < -20) {
                // made it to the top!
                cleanCanvas();
                player.y = 405;
                updateScore(10);
            }
            break;
        case 'down':
            // 1. can't go off the canvas on the left.
            if(player.y + 85 > 405) {
                player.y = 405;
            }else{
                player.y += 85;
            }
            break;
        default:
            // not valid movement so don't do anything
    }
}

Player.prototype.render = function() {
    // add the player to the canvas
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction) {
    // update the player position
    this.update(direction)
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
// Place the player object in a variable called player
var player = new Player(202, 405);
var score = 0;
for(var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy);
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

// HELPERS
var cleanCanvas = function() {
    // When the player hits the top "clear" canvas so the chars
    // head doesn't remain at the top of the canvas.
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 171);
}

var updateScore = function(adder) {
    var scoreSpan = document.getElementById("score");
    scoreSpan.innerHTML = score += adder;
}