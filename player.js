import { Sitting, Running, Jumping, Falling, Rolling, Diving } from "./playerStates.js";

export class Player {
    constructor(game){
        this.game = game; 
        this.width = 100;
        this.height = 91.3;
        this.x=0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.vy = 0; //velocity y
        this.weight = 1;
        this.image = document.getElementById('player');
        this.speed = 0;
        this.maxSpeed= 8;
        this.fps = 20; 
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game)];
        
    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        // horizontal movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed; 
        else if (input.includes ('ArrowLeft')) this.speed = -this.maxSpeed; 
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x> this.game.width - this.width) this.x = this.game.width - this.width;
        // vertical movement
        //if (input.includes ('ArrowUp') && this.onGround()) this.vy -= 30; 
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        if (this.frameTimer > this.frameInterval){
            this.frametimer = 0; 
        }
        //vertial boundaries
        if (this.y > this.game.height - this.height- this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;
        
    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    } 

    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    checkCollision(){
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y < this.y + this.height &&
                enemy.y + enemy.height > this.y
            ){
                //collision detected
                enemy.markedForDeletion = true;
                if (this.currentState === this.states[1] || this.currentState === this.states[2] || this.currentState === this.states[3] || this.currentState === this.states[5]){
                    this.game.score++;
                } else {
                    this.setState(5,0);
                }
            
            }
        })
    }
}  
