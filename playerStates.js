import { Dust, FlyDust, Spalsh } from "./particles.js";

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5, 
}

class State {
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game){
        super('SITTING', game);
        this.game = game;
    }
    enter() {

    }
    handleInput(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State {
    constructor(game){
        super('RUNNING', game);
        this.game = game;
    }
    enter() {

    }
    handleInput(input){
        this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
        if (input.includes('ArrowDown')){
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes('ArrowUp')){
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State {
    constructor(game){
        super('JUMPING', game);
        this.game = game;
    }
    enter() {
        if (this.game.player.onGround()) this.game.player.vy -= 30;
    }
    handleInput(input){
        this.game.particles.unshift(new FlyDust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.vy > this.game.player.weight){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Falling extends State {
    constructor(game){
        super('FALLING', game);
        this.game = game;
    }
    enter() {
        
    }
    handleInput(input){
        this.game.particles.unshift(new FlyDust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Rolling extends State {
    constructor(game){
        super('ROLLING', game);
        this.game = game;
    }
    enter() {
        
    }
    handleInput(input){
        if (!input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes('Enter') && !this.game.player.onGround()){
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes('ArrowDown')){
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(game){
        super('DIVING', game);
        this.game = game;
    }
    enter() {
        this.game.player.vy = 15;
    }
    handleInput(input){
        if (this.game.player.onGround()){
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i++)
                this.game.particles.unshift(new Spalsh(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 1.6));
        } else if (input.includes('Enter') && this.game.player.onGround()){
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}