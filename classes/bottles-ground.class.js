class BottlesGround extends Bottles{
    y = 360;

    constructor(){
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 300 + Math.random() * 2000;
    }
}