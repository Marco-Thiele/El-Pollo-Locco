class Bottles extends DrawableObjects{
    y = 100;
    height= 70;
    width = 60;

    constructor(){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = 300 + Math.random() * 2000;
    }
}