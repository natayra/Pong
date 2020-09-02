
// still have some bugs and the design can be better

// Canvas class build canvas objects with score

class Canvas {
  constructor() {
    this.score1 = 0;
    this.score2 = 0;
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
  }

  renderBoard(cWidth, cHeight) {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, cWidth, cHeight);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.canvas.width/2, 0, 0.5, this.canvas.height);
    this.ctx.fillText(this.score1 + "     " + this.score2, this.canvas.width/2, 30);
  }
}

// Ball class build ball objects

class Ball {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
  }
  renderBall(posX, posY) {
    this.goRight = true;
    this.ctx.fillStyle = "white";
    this.ctx.beginPath();
    this.ctx.arc(posX, posY, 10, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }
}

// Paddle class build paddle objects
// create paddle, move paddle

class Paddle {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.width = 20;
    this.height = 60;
  }
  renderPaddle(pX, pY) {
    this.ctx.fillStyle = "purple";
    this.ctx.fillRect(pX, pY, this.width, this.height);
  }
  movePadLeft(pY) {
    document.addEventListener("keypress", (event) => {
      if (event.key === "w" && pY.paddleLeftY > 0) {
        pY.paddleLeftY -= 6;
      }

      if (event.key === "s" && pY.paddleLeftY <= 434) {
        pY.paddleLeftY += 6;
      }
    });
  }

  movePadRight(pY) {
    document.addEventListener("keypress", (event) => {
      if (event.key === "o" && pY.paddleRightY > 0) {
        pY.paddleRightY -= 8;
      }

      if (event.key === "l" && pY.paddleRightY <= 434) {
        pY.paddleRightY += 8;
      }
    });
  }
}

// Game class have all the "variables" and build ball moviment, paddle moviment, collisions and score 

class Game {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.myPaddleLeft = new Paddle();
    this.myPaddleRight = new Paddle();
    this.myCanvas = new Canvas();
    this.myBall = new Ball();
    this.myPaddleLeft.movePadLeft(this);
    this.myPaddleRight.movePadRight(this);
    this.posX = 400;
    this.posY = 200;
    this.addX = +2;
    this.addY = +2;
    this.paddleLeftX = 10;
    this.paddleLeftY = 0;
    this.paddleRightX = 670;
    this.paddleRightY = 0;
    this.canvasWidth = 700;
    this.canvasHeight = 500;
    setInterval(this.callFun.bind(this), 15);
  }
  moveBall() {
    this.posX += this.addX;
    this.posY += this.addY;
    if (this.posX >= this.canvasWidth || this.posX <= 0) {
      this.addX = -this.addX;
    }
    if (this.posY >= this.canvasHeight || this.posY <= 0) {
      this.addY = -this.addY;
    }
  }

  checkCollisions() {
    if (
      this.posX === 40 &&
      this.posY >= this.paddleLeftY -10 &&
      this.posY <= this.paddleLeftY + 70
    ) {
      this.addX = -this.addX;
    } 
    else if (
      this.posX === 660 &&
      this.posY >= this.paddleRightY -10 &&
      this.posY <= this.paddleRightY + 70
    ) {
      this.addX = -this.addX;
    }
    
    // tried to solve the bug of the ball passing throw the paddle
    // but for now only stoped the paddle from moving

    if (this.posX < 40) {                   
      this.paddleLeftY = this.paddleLeftY;    
    }                                   
    else if (this.posX > 600) {         
      this.paddleLeftY = this.paddleLeftY;
    }

  }
  score(){
    if(this.posX === 0) {
      this.myCanvas.score2 += 1;
      this.posX = 350; // try to change to a random number
      this.posY = 250; // try to change to a random number

    }
    
    else if(this.posX === this.canvasWidth){
      this.myCanvas.score1 += 1;
      this.posX = 350; // try to change to a random number
      this.posY = 250; // try to change to a random number

    }
  }

  // function that wil be used on the setInterval one

  callFun() {
    this.myCanvas.renderBoard(this.canvasWidth, this.canvasHeight);
    this.myPaddleLeft.renderPaddle(this.paddleLeftX, this.paddleLeftY);
    this.myPaddleRight.renderPaddle(this.paddleRightX, this.paddleRightY);
    this.myBall.renderBall(this.posX, this.posY);
    this.moveBall();
    this.checkCollisions();
    this.score();
  }
 
}

// creating my Game 

const myGame = new Game();
console.log(myGame);
