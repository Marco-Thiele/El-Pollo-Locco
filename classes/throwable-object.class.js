class TrowableObject extends MovebleObject {


    speedY = 25;
    speedX = 20;
    splash = false;
    broken = new Audio('audio/broken.mp3')


    imagesThrow = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    imagesSplash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.imagesSplash);
        this.loadImages(this.imagesThrow);
        this.x = x;
        this.y = y;
        this.originalY = y;
        this.height = 60;
        this.width = 50;
        this.splashBottle();
        this.animate();
    }


    /**
     * This function let the bootles fly
     * 
     */
    Throw() {
        if (world.throwableObjeckt.length > 0)
            this.applyGravity();
        setStoppableInterval(() => {
            if (world.throwRight)
                this.x += this.speedX;
            else
                this.x -= this.speedX;
        }, 50);
    }

/**
 * This function is used for splashed bottles 
 * 
 */
    splashBottle() {
        setStoppableInterval(() => {
            if (this.canBottleSplash()) {
                this.speedX = 0;
                this.speedY = 0;
                this.acceleration = 0;
                this.splash = true;
            }
        }, 100);
    }


    /**
     * This function return if the bottle can splash or not
     * 
     * @returns true ore false
     */
    canBottleSplash(){
        return this.y > 360 && !this.splash && world.throwableObjeckt.length > 0
    }


    /**
     * This funktion is for the bottles animation
     * 
     */
    animate() {
        setStoppableInterval(() => {
            if (this.splash) 
                this.playAnimation(this.imagesSplash, this.imagesSplash.length);
        }, 20);
        setStoppableInterval(()=> {
            this.playAnimation(this.imagesThrow);
        },80);
    }
}