export class UI{
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context){
        context.save();
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'right';
        context.fillStyle = this.game.frontColor;
        //score
        context.fillText('Score: ' + this.game.score, 975, 50);
        //timer
        context.font = this.fontSize *0.8 + 'px ' + this.fontFamily;
        context.fillText ('Time: ' + (this.game.time * 0.001).toFixed(1), 975, 100);
        //game over message
        // if (this.game.gameOver) {
        //     context.textAlign = 'center';
        //     context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        //     if (this.game.score >= 30) {
        //         context.fillText('GG', this.game.width * 0.5, this.game.height * 0.5);
        //         context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
        //         context.fillText('You killed enough enemies!', this.game.width * 0.5, this.game.height * 0.5 + 30);
        //     } else {
        //         context.fillText('Noob', this.game.width * 0.5, this.game.height * 0.5);
        //         context.font = this.fontSize * 1 + 'px ' + this.fontFamily;
        //         context.fillText('You lost xd!', this.game.width * 0.5, this.game.height * 0.5 + 30);
        //     }
        // }
        context.restore();
    }
}