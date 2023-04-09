let screen;
let ball;
let player;

function setup() {
    let screenWidth = 600;
    let screenHeight = 400;
    createCanvas(screenWidth, screenHeight);
    screen = new Screen(screenWidth, screenHeight);
    ball = new Ball();
    player = new Player();
}

function keyTyped() {
    if (key === 'a') {
        loop();
    }
}

function draw() {
    screen.draw();
    ball.draw();
    player.draw();

    ball.update()
    player.move();

    if (ball.isColliding(player)) {
        ball.reverseX();
        noLoop();
    }

    if (ball.isCollidingBorder(screen)) {
        ball.reverseY();
    }

}

class Screen {

    constructor(screenWidth, screenHeight) {
        this.inferiorLimit = 0;
        this.superiorLimit = screenHeight;
    }

    draw() {
        background(0);
    }

    getInferiorYLimit() {
        return this.inferiorLimit;
    }

    getSuperiorYLimit() {
        return this.superiorLimit;
    }
}

class Ball {

    constructor() {
        this.radius = 15;
        this.positionX = 300;
        this.positionY = 200;
        this.xSpped = 6;
        this.ySpeed = 6;
    }

    draw() {
        circle(this.positionX, this.positionY, (this.radius * 2));
    }

    update() {
        this.positionX += this.xSpped;
        this.positionY += this.ySpeed;

        if (this.positionX + this.radius >= width || this.positionX - this.radius <= 0) {
            this.reverseX();
        }
    }

    isColliding(racket) {
        return this.positionX - this.radius <= racket.getLimitX()
            && this.positionY >= racket.getInferiorYLimit()
            && this.positionY <= racket.getSuperiorYLimit();
    }

    isCollidingBorder(screen) {
        return this.positionY + this.radius >= screen.getSuperiorYLimit()
            || this.positionY - this.radius <= screen.getInferiorYLimit();
    }

    reverseX() {
        this.xSpped *= -1;
    }

    reverseY() {
        this.ySpeed *= -1;
    }
}

class Player {

    constructor() {
        this.positionX = 10;
        this.positionY = 150;
        this.width = 10;
        this.heigth = 100;
        this.speed = 5;
    }

    getLimitX() {
        return this.positionX + this.width;
    }

    getSuperiorYLimit() {
        return this.positionY + this.heigth;
    }

    getInferiorYLimit() {
        return this.positionY;
    }

    draw() {
        rect(this.positionX, this.positionY, this.width, this.heigth);
    }

    move() {
        if (keyIsDown(UP_ARROW)) {
            this.positionY -= this.speed;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.positionY += this.speed;
        }

        if (this.positionY <= 10) {
            this.positionY = 10;
        }

        if (this.positionY + this.heigth >= height - 10) {
            this.positionY = height - this.heigth - 10;
        }
    }
}