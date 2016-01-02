var total = 100;
var bubbles = [];

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');

    for (var i=0; i<total; i++) {
      bubbles.push(new Bubble());
    }

    frameRate(1000);
}

function draw() {
    background(50, 89, 100);

    for (var i=0; i<bubbles.length; i++) {
      bubbles[i].move();
      bubbles[i].bounce();
      bubbles[i].display(i);
    }

    // check collision
    bounce();
}

// Bubble class
function Bubble() {
    this.diameter = random(10, 30);
    this.radius = this.diameter / 2;
    this.x = random(this.radius, width);
    this.y = random(this.radius, height);
    this.speedX = 1;
    this.speedY = 1;

    this.move = function() {
        this.x += this.speedX + random(-1, 1);
        this.y += this.speedY + random(-1, 1);
    };

    this.display = function(i) {
        noStroke();
        fill(10 * i, 128 + 10 * i, 256 - 10 * i);
        ellipse(this.x, this.y, this.diameter, this.diameter);
    };

    // bounce against walls
    this.bounce = function() {
        // left and right
        if ((this.x + this.radius > width) || (this.x - this.radius < 0)) {
            this.speedX = this.speedX * -1;
        }
        // top and bottom
        if ((this.y + this.radius > height) || (this.y - this.radius < 0)) {
            this.speedY = this.speedY * -1;
        }
    }
}

/**
 * check collision between bubbles and bounch each other
 */
function bounce() {
    for (var i = 0; i < bubbles.length; ++i) {
        var source_left = bubbles[i].x - bubbles[i].radius;
        var source_right = bubbles[i].x + bubbles[i].radius;
        var source_top = bubbles[i].y - bubbles[i].radius;
        var source_bottom = bubbles[i].y + bubbles[i].radius;
        for (var j = i + 1; j < bubbles.length; ++j) {
            var target_left = bubbles[j].x - bubbles[j].radius + 1;
            var target_right = bubbles[j].x + bubbles[j].radius - 1;
            var target_top = bubbles[j].y - bubbles[j].radius + 1;
            var target_bottom = bubbles[j].y + bubbles[j].radius - 1;
        
            if (((source_left > target_left && source_left < target_right) || (source_right > target_left && source_right < target_right)) &&
              ((source_top > target_top && source_top < target_bottom) || (source_bottom > target_top && source_bottom < target_bottom))) {
                bubbles[i].speedX *= -1;
                bubbles[i].speedY *= -1;
                bubbles[j].speedX *= -1;
                bubbles[j].speedY *= -1;
            }
       }
    }
}