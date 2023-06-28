class Character extends MovebleObject {
    height = 250;
    width = 150;
    y = 190;
    speed = 6;
    offset = {
        top: 120,
        left: 40,
        right: 30,
        bottom: 0,
    }
    right = false;
    world;
    walking_sound = new Audio('audio/running.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    imagesWalking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    imagesJumping = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    imagesDead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ]

    imagesHurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ]

    imagesIdle = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.imagesWalking);
        this.loadImages(this.imagesJumping);
        this.loadImages(this.imagesDead);
        this.loadImages(this.imagesHurt);
        this.loadImages(this.imagesIdle);
        this.animate();
        this.applyGravity();

    }



    /**
     * This function is for animation and moving
     * 
     */
    animate() {
        setStoppableInterval(() => {
            this.moveCharacter();
        }, 1000 / 60);

        setStoppableInterval(() => {
            this.playCharacter();
        }, 60);
    }


    /**
     * This function is for moving the character
     * 
     */
    moveCharacter() {
        this.walking_sound.pause()
        if (this.canMoveRight())
            this.moveRight();
        if (this.canMoveLeft())
            this.moveLeft();
        if (this.canjump())
            this.jump();
        this.world.camera_x = -this.x + 100;
    }


    /**
     * This function checks if the character can jump
     * 
     * @returns true or false
     */
    canjump() {
        return this.world.keyboard.space && !this.isAboveGround();
    }


    /**
     * The charackter jumped
     */
    jump() {
        super.jump();
        if (!this.world.mute)
            this.jump_sound.play();
    }


    /**
     * This function checks if the character can move right
     * 
     * @returns true or false
     */
    canMoveRight() {
        return this.world.keyboard.right && this.x < this.world.level.level_end_x;
    }


    /**
     * This function checks if the character can move left
     * 
     * @returns true or false
     */
    canMoveLeft() {
        return this.world.keyboard.left && this.x > 0;
    }


    /**
     * The character move right
     * 
     */
    moveRight() {
        super.moveRight();
        this.right = true;
        if (!this.world.mute) {
            this.walking_sound.play();
        }
    }


    /**
     * The character move left
     * 
     */
    moveLeft() {
        super.moveLeft()
        this.right = false;
        if (!this.world.mute) {
            this.walking_sound.play();
        }
        this.otherDirection = true;
    }


    /**
     * This function is used for playing the character animation
     * 
     */
    async playCharacter() {
        if (this.hurt()) {
          this.playAnimation(this.imagesHurt);
        } else if (this.isDead()) {
          this.playAnimation(this.imagesDead);
        } else if (this.isAboveGround()) {
          this.playAnimation(this.imagesJumping);
        } else if (this.world.keyboard.right || this.world.keyboard.left) {
          this.playAnimation(this.imagesWalking);
        } else if (await this.canIdle()) {
          this.playAnimation(this.imagesIdle);
        }
      }
      


    canIdle() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const shouldIdle = !this.world.keyboard.right && !this.world.keyboard.left && !this.isAboveGround();
            resolve(shouldIdle);
          }, 1000);
        });
      }
}