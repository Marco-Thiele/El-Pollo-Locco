class MovebleObject extends DrawableObjects {


    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    deadChicken = new Audio('audio/chicken.mp3')
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }


    /**
     * This function is for gravity
     * 
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }


    /**
     * this function checks if it above ground
     * 
     * @returns number
     */
    isAboveGround() {
        if (this instanceof TrowableObject) {
            return true;
        } else {
            return this.y < 190;
        }
    }


    /**
     * This function is used for objects which move right
     * 
     */
    moveRight() {
        this.x += this.speed
        this.otherDirection = false;
    }


    /**
     * This function is used for objects which move left
     * 
     */
    moveLeft() {
        this.x -= this.speed
    }


    /**
     * This function is used to play all animations
     * 
     * @param {object} images images path
     * @param {number} maxIterations max iterations
     */
    playAnimation(images, maxIterations) {
        if (typeof maxIterations === 'undefined') 
            maxIterations = Infinity;
        if (!this.iterations) 
            this.iterations = 0;
        if (!this.maxIterations) 
            this.maxIterations = null;
        if (this.iterations <= maxIterations) {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
            this.iterations++;
        }
    }


    /**
     * This function is for jumping
     * 
     */
    jump() {
        this.speedY = 23;
    }


    /**
     * this function checks if some objeckts are colliding
     * 
     * @param {object} obj 
     * @returns true or false
     */
    isColliding(obj) {
        // return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
        //   (this.y + this.offsetY + this.height) >= obj.y &&
        //   (this.y + this.offsetY) <= (obj.y + obj.height) //&& c
        //  obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
        return this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
            this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
            this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
            this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    }


    /**
     * This function reduced the energy of an objekt
     * 
     */
    hit() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * This function is to check if the objeckt dead
     * 
     * @returns true or false
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function checks if the time passed from the last hit
     * 
     * @returns number
     */
    hurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }


    /**
     * This function played the Animation for dead objects
     * 
     */
    enemyDead() {
        setStoppableInterval(() => {
            this.playAnimation(this.imageDeadChicken);
        }, 120);
    }


    /**
     * This function is for splice the dead enemy 
     * 
     * @param {object} enemy 
     * @param {Array} enemies 
     */
    enemyIsDead(enemy, enemies) {
        enemy.energy = 0;
        if (!world.mute)
            this.deadChicken.play();
        setTimeout(() => {
            const enemyIndex = enemies.indexOf(enemy);
            enemies.splice(enemyIndex, 1);
        }, 500);
    }

}

