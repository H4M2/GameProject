class Particle {
    constructor (game) {
        this. game = game; 
        this.markedForDeletion = false;
    }
    update(){
        this.x -= this.speedx+this.game.speed;
        this.y -= this.speedy;
        this.size *= 0.95;
        if (this.size < 0.5) this.markedForDeletion = true;
    }
}


export class Dust extends Particle {
    constructor (game, x, y){
        super(game);
        this.size = Math.random() * 10 + 10;
        this.x = x;
        this.y = y;
        this.speedx = Math.random();
        this.speedy = Math.random();
        this.color = '#800000';
    };

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill()
    }
}

export class FlyDust extends Particle {
    constructor (game, x, y){
        super(game);
        this.size = Math.random() * 10 + 50;
        this.x = x;
        this.y = y;
        this.speedx = Math.random();
        this.speedy = Math.random();
        this.color = '#800000';
    };

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill()
    }
}

export class Spalsh extends Particle {
    constructor (game, x, y){
        super(game);
        this.size = Math.random() * 10 + 50;
        this.x = x;
        this.y = y;
        this.speedx = Math.random() * 6 - 3;
        this.speedy = Math.random() * 2 + 2;
        this.gravity = 0;
        this.color = '#800000';
    };
    update(){
        super.update();
        this.gravity += 0.1;
        this.y += this.gravity;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.fill()
    }
}
