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
    const fm = document.getElementById('FM');
    const sm = document.getElementById('SM');

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
            this.enemyInterval = 700; //enemy spawn timer
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
            if (fm.checked) {
                this.maxSpeed = 20;
                this.enemyInterval = 100;
            } else if (sm.checked) {
                this.maxSpeed = 1;
            } else {
                this.maxSpeed = 3;
                this.enemyInterval = 700;
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


    
let filterString ='none'
const controls = [
  {name:'grayscale',min:0,max:100,val:0,d:'%'},
  {name:'hue-rotate',min:0,max:360,val:0,d:'deg'},
  {name:'saturate',min:0,max:200,val:100,d:'%'},
  {name:'sepia',min:0,max:100,val:0,d:'%'},
];

//Create some hacked controls
//You should properbly never do anything like this in production :-)
controls.forEach(ctrl=>{
  const elm = document.createElement("DIV");
  elm.innerHTML = `<div>
    <o>${ctrl.name}</o>
    <input id="haxctrl_${ctrl.name}" d="${ctrl.d}" type="range" value="${ctrl.val}" min="${ctrl.min}" max="${ctrl.max}" />
    <b>${ctrl.val}${ctrl.d}</b>
</div>`;
elm.oninput=e=>{
  e.target.parentElement.querySelector("input+b").innerText=e.target.value+e.target.getAttribute("d");
  makeFilterString();
}
divControls.appendChild(elm);
});

//Create filter string using the hacked controls
function makeFilterString(){
  filterString= controls.map(f=>`${f.name}(${document.getElementById('haxctrl_'+f.name).value}${f.d})`).join('\r\n');
  taFilter.value=filterString;
}
makeFilterString();

!(function loop(time){
    
  //Play whith the filters using hacked controls
  ctx.filter=filterString;
	ctx.drawImage(canvas1, canvas.width,0);

	requestAnimationFrame(loop);//loop
})(0)

});


