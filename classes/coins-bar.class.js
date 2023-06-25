class CoinBar extends DrawableObjects {
    imagesCoins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',

    ];

    coins = 0;


    constructor() {
        super();
        this.loadImages(this.imagesCoins);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height= 60;
        this.setPercentage(0);
    }


    /**
     * This function show the image for the status bar
     * 
     * @param {number} percentage 
     */
    setPercentage(coins){
        this.coins = coins;
        let path = this.imagesCoins[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }


    /**
     * This funktion is used for which image should play
     * 
     * @returns a number between 0 and 5
     */
    resolveImageIndex(){
        if (this.coins == 100) {
           return 5;
        } else if (this.coins  >= 80 && this.coins < 100) {
            return 4;
        }else if (this.coins  >= 60 && this.coins < 80) {
            return 3;
        }else if (this.coins  >= 40 && this.coins < 60) {
            return 2;
        }else if (this.coins  >= 20 && this.coins < 40) {
            return 1;
        }else if (this.coins  >= 0 && this.coins < 20) {
            return 0;
        }
    }


    /**
     * This function is to calculate the percantage
     * 
     */
    calculatePercentage() {
        this.coins += 10;
        if (this.coins >= 100) {
            this.coins = 100;
        }
        this.setPercentage(this.coins);
    }
}
