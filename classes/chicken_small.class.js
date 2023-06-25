class ChickenSmall extends MovebleObject{
    height = 60;
    width = 40;
    y = 360;
    imagesWalking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    imageDead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png')
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imageDead);
        this.x = 300 + Math.random() * 2000; //  immer eine Zahl Zwischen 200 und 700   Math.random() ist immer eine Zahl wischen  0 und 1
        this.speed = 0.4 + Math.random() * 0.35;
        
        this.animate();
    }


    /**
     * This function is for animation and moving
     * 
     */
    animate() {
        setStoppableInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setStoppableInterval(() => {
            if (this.isDead()) 
                this.playAnimation(this.imageDead); 
             else 
                this.playAnimation(this.imagesWalking);
        }, 120);
    }
}