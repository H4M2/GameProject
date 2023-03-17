import { InputHandler } from './input.js';
import {Player} from './player.js';
import { Background } from './background.js';
import { FlyingEnemy, GroundEnemy } from './enemies.js';
import { UI } from './UI.js';


window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000; 
    canvas.height = 700;

    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 115;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this); 
            this.input = new InputHandler(this);
            this.UI = new UI(this);
            this.fps = 60;
            this.timer = 10;
            this.interval = 1000/this.fps;
            this.enemies = [];
            this.particles = [];
            this.maxParticles = 200;
            this.enemyTimer = 0;
            this.enemyInterval = 1000; //enemy spawn timer
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black'
            this.time = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime){
            this.time += deltaTime;
            // if (this.time > this.maxTime) this.gameOver = true;
            this.background.update();
            this.player.update(this.input.keys, deltaTime);
            //handleEnemies
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
            })
            //particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1);
            })
            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }
        }
        draw(context, deltaTime){
            if (this.timer > this.interval){
                context.clearRect(0, 0, this.width, this.height);
                this.background.draw(context);
                this.player.draw(context);
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                });
                this.particles.forEach(particle => {
                    particle.draw(context);
                });
                this.UI.draw(context);
                this.timer = 0
            }
            this.timer += deltaTime;
            
        }
        addEnemy(){
            if(this.speed>0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw(ctx, deltaTime);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});