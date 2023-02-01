export class UI{
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'right';
        context.fillStyle = this.game.frontColor;
        //score
        context.fillText('Score: ' + this.game.score, 975, 50);
    }
}