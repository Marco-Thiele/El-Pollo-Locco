class BottlesBar extends DrawableObjects{

    imagesBar = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];

    bottles = 0;

    constructor() {
        super();
        this.loadImages(this.imagesBar);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height= 60;
        super.setPercentage(0);
    }


    /**
     * This function is to calculate the percantage
     * 
     */
    calculatePercentage() {
        this.bottles += 10;
        if (this.bottles >= 100) {
            this.bottles = 100;
        }
        this.setPercentage(this.bottles);
    }
}

