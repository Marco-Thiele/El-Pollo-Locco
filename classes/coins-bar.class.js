class CoinBar extends DrawableObjects {
    imagesBar = [
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
        this.loadImages(this.imagesBar);
        this.x = 30;
        this.y = 100;
        this.width = 200;
        this.height= 60;
        this.setPercentage(0);
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
