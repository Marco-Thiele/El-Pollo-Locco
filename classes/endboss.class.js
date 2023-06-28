class Endboss extends MovebleObject {

    height = 500;
    width = 300;
    y = -30;
    isEndboss = true;
    firstcontact = false;
    speed = 4;
    colligingCharacter = false;
    offset = {
        top: 0,
        left: 40,
        right: 30,
        bottom: 0,
    }
    imagesAlert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    imageWalking = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    imageAttack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    imageHurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    imageDead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.imagesAlert[0]);
        this.loadImages(this.imagesAlert);
        this.loadImages(this.imageWalking);
        this.loadImages(this.imageAttack);
        this.loadImages(this.imageHurt);
        this.loadImages(this.imageDead);
        this.x = 2700;
        this.animate();

    }


    /**
     * This funktion is for the endboss animation
     * 
     */
    animate() {
        let i = 0;
        setStoppableInterval(() => {
            if (i < 10)
                this.playAnimation(this.imagesAlert);
            else if (this.hurt())
                this.playAnimation(this.imageHurt);
            else if (this.colligingCharacter)
                this.playAnimation(this.imageAttack);
            else if (this.isDead())
                this.playAnimation(this.imageDead);
            else {
                this.playAnimation(this.imageWalking);
            }
            i++;
            if (world.character.x >= 2200 && !this.firstcontact) {
                i = 0;
                this.firstcontact = true;
            }
        }, 150);
        setStoppableInterval(() => {
            this.moveLeft(i);
        }, 1000 / 60)
    }


    /**
     * this function  is to check if the endboss can move left
     * 
     * @param {number} i 
     * @returns true or false
     */
    canMoveLeft(i){
        return this.firstcontact && i > 10
    }


    /**
     * This function is used for objects which move left
     * 
     * @param {number} i 
     */
    moveLeft(i) {
        if (this.canMoveLeft(i)) {
            super.moveLeft();
            if (this.hurt()) {
                this.speed = 2;
                setTimeout(() => {
                    this.speed = 4;
                }, 700);
            }
            if (this.isDead()) 
                this.speed = 0;
        }
    }



    /**
     * This function reduced the energy of the endboss
     * 
     */
    hitEndboss() {
        this.energy -= 15;
        console.log('endboss energy', this.energy)
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    
    /**
     * This function checks if the time passed from the last hit
     * 
     * @returns number
     */
    hurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

}