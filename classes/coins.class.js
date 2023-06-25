class Coins extends DrawableObjects{
    width = 90;
    height = 90;
   

    constructor(){
        super().loadImage('img/8_coin/coin_2.png');
        this.x = 300 + Math.random() * 2000;
         this.y = 280 - Math.random() * 200;
    }
}