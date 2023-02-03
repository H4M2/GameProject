class Enemy{
    constructor(){
        this.markedForDeletion = false;
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y -= this.speedY;
        //offscreen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height)
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width + Math.random() * this.game.height * 0.5;;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = Math.random() + 0.5;
        this.speedY = 0;
        this.image = document.getElementById('enemy_fly');
        this.angle = 0;
        this.va = Math.random() * 0.05 + 0.05;
    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
        this.x += Math.cos(this.angle);
    }
} 

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('enemy_ground');
        this.speedX = 0;
        this.speedY = 0;
    }
}
