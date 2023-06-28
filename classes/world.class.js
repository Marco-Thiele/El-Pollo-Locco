class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBottle = new BottlesBar();
    statusCoin = new CoinBar();
    statusEndboss = new EndbossBar();
    throwableObjeckt = [];
    backgroundSound = new Audio('audio/backgroundMusic.mp3');
    mute = false;
    throwRight = true;
    coinSound = new Audio('audio/coin.mp3');
    throwSound = new Audio('audio/throw.mp3');
    endbossHurtSound = new Audio('audio/endbossHurt.mp3')
    hurtSound = new Audio('audio/hurt.mp3');
    takeBottleSound = new Audio('audio/takeBottle.mp3');
    oneThrow = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.backgroundSound.volume = 0.1;
        this.backgroundSound.currentTime += 6;
        this.backgroundSound.play();
    }


    /**
     * This funktion connected the world with the varable world.character.world
     * 
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * this function draw all objects in canvas
     * 
     */
    draw() {
        this.drawMovable();
        this.drawFixed();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }


    /**
     * this function draw all fixed objects in canvas
     * 
     */
    drawFixed() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBottle);
        this.addToMap(this.statusCoin);
        this.addToMap(this.statusEndboss);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * this function draw all movable objects in canvas
     * 
     */
    drawMovable() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjeckt);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
    }


    /**
     * this function looking for all objects
     * 
     * @param {string} objects  - objects to draw
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o)
        })
    }


    /**
     * This checks if the images have to flip
     * 
     * @param {*} mo - objects to draw
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * this function fliped the images
     * 
     * @param {*} mo - objects to draw
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * This function fliped the images back
     * 
     * @param {*} mo - objects to draw
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * This function stardet all intervals
     * 
     */
    run() {
        setStoppableInterval(() => {
            if (this.level) {
                this.checkCollisionsBottle();
                this.checkCollisionsCoins();
                this.throwObjects();
                this.checkCollisionsEnemy();
                this.bottleSplash();
            }
        }, 10);
    }


    /**
     * This function checks if a enemy is collding with the character
     * 
     */
    checkCollisionsEnemy() {
        let enemies = this.level.enemies;
        for (let i = enemies.length - 1; i >= 0; i--) {
            const enemy = enemies[i];
            this.collisionsEnemy(enemy, enemies, i)
        }
        this.level.endboss.forEach((enemy) => {
            if (enemy.isColliding(this.character)) {
                this.collisionsEndboss()
            }
        });
    }


    /**
     * this function checked if the chicken be hited or the character
     * 
     * @param {String} enemy 
     * @param {Array} enemies 
     * @param {Number} i 
     */
    collisionsEnemy(enemy, enemies, i) {
        if (this.canCharacterHit(enemy)) {
            this.character.hit();
            if (!world.mute)
                this.hurtSound.play();
            this.statusBar.setPercentage(this.character.energy);
        } else if (this.canEnemyHit(enemy)) {
            enemy.enemyIsDead(enemy, enemies, i);
        }
    }


    /**
     * can the enemy be hit
     * 
     * @param {string} enemy 
     * @returns true or false
     */
    canEnemyHit(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && enemy.energy != 0 && this.character.speedY < 0;
    }


    /**
     * can the character be hit
     * 
     * @param {string} enemy 
     * @returns true or false
     */
    canCharacterHit(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround() && !enemy.isDead();
    }


    /**
     * This function is used for when the endboss is colliding with the character to play the attac animation
     * 
     */
    collisionsEndboss() {
        this.level.endboss[0].colligingCharacter = true;
        this.character.energy = 0;
        this.statusBar.setPercentage(this.character.energy);
        setTimeout(() => {
            this.level.endboss[0].colligingCharacter = false;
        }, 1000);
    }


    /**
     * This function is for collecting bottles
     * 
     */
    checkCollisionsBottle() {
        this.level.bottles.forEach((bottles, index) => {
            if (this.character.isColliding(bottles)) {
                this.statusBottle.calculatePercentage();
                this.level.bottles.splice(index, 1);
                if (!world.mute)
                    this.takeBottleSound.play();
            }
        });
    }


    /**
     * This function is for collecting coins
     * 
     */
    checkCollisionsCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.statusCoin.calculatePercentage();
                this.level.coins.splice(index, 1);
                if (!world.mute) {
                    this.coinSound.play();
                }
            }
        });
    }


    /**
     * This function is used to throw bottles
     * 
     */
    throwObjects() {
        if (this.canThrowObjects()) {
            let bottle = new TrowableObject(this.character.x + 100, this.character.y + 100);
            if (!bottle.splash) {
                this.throwableObjeckt.push(bottle);
                this.checkThrowRight();
                bottle.Throw();
                this.updatePercantage(bottle);
                this.oneThrow = true;
            }
        }
    }


    /**
     * This function checks can the bottle be thrown
     * 
     * @returns true or false
     */
    canThrowObjects() {
        return this.keyboard.d && this.throwableObjeckt.length < 1 && this.statusBottle.bottles > 0 && !this.oneThrow;
    }


    /**
     * This function checks if the bottle be thrown left or right 
     * 
     */
    checkThrowRight() {
        if (this.character.right)
            this.throwRight = true;
        else
            this.throwRight = false;
    }


    /**
     * This funktion updated the bottlesbar
     * 
     * @param {string} bottle 
     */
    updatePercantage(bottle) {
        this.statusBottle.bottles -= 10;
        this.statusBottle.setPercentage(this.statusBottle.bottles);
        this.objectsHit(bottle);
        this.objectsHitEndboss(bottle);
        if (!world.mute)
            this.throwSound.play();
    }


    /**
     * This function spliced a bottle from the array
     * 
     */
    bottleSplash() {
        this.throwableObjeckt.forEach((bottles) => {
            if (bottles.splash == true) {
                if (!world.mute)
                    bottles.broken.play();
                setTimeout(() => {
                    const bottlesIndex = this.throwableObjeckt.indexOf(bottles)
                    this.throwableObjeckt.splice(bottlesIndex, 1);
                }, 50);
                setTimeout(() => {
                    this.oneThrow = false;
                }, 200);
            }
        })
    }


    /**
     * This function spliced the enemy which was hit from a bottle
     * 
     */
    objectsHit() {
        setStoppableInterval(() => {
            this.throwableObjeckt.forEach((bottle) => {
                this.level.enemies.forEach((enemy, index) => {
                    if (bottle.isColliding(enemy) && !bottle.splash) {
                        this.level.enemies.splice(index, 1);
                        bottle.splash = true;
                    }
                });
            })
        }, 100);
    }


    /**
     * This function updated the endboss bar when he has a hit from a bottle
     * 
     */
    objectsHitEndboss() {
        setStoppableInterval(() => {
            this.throwableObjeckt.forEach((bottle) => {
                this.level.endboss.forEach((enemy) => {
                    if (this.canBottleHit(bottle, enemy)) {
                        this.level.endboss[0].hitEndboss();
                        this.statusEndboss.setPercentage(this.level.endboss[0].energy);
                        bottle.splash = true;
                        if (!world.mute)
                            this.endbossHurtSound.play();
                    }
                });
            })
        }, 100);
    }


    /**
     * Can the enemy be hit from a bottle
     * 
     * @param {string} bottle 
     * @param {string} enemy 
     * @returns true or false
     */
    canBottleHit(bottle, enemy) {
        return bottle.isColliding(enemy) && !bottle.splash;
    }


    /**
     * if the enemy is dead he will be spliced from the array
     * 
     */
    enemyDelete() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.enemyIsDead) {
                setTimeout(() => {
                    enemy.splice(index, 1);
                }, 500);
            }
        });
    }


    /**
     * This function stoppt all inervals
     */
    clearAllIntervals() {
        for (let i = 1; i < 9999; i++) window.clearInterval(i);
    }
}