class BottlesBar extends DrawableObjects{

    imagesBottles = [
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
        this.loadImages(this.imagesBottles);
        this.x = 30;
        this.y = 50;
        this.width = 200;
        this.height= 60;
        this.setPercentage(0);
    }


    /**
     * This function show the image for the status bar
     * 
     * @param {number} percentage 
     */
    setPercentage(bottles){
        this.bottles = bottles;
        let path = this.imagesBottles[this.resolveImageIndex()];
        this.img = this.imageCache[path];

    }


    /**
     * This funktion is used for which image should play
     * 
     * @returns a number between 0 and 5
     */
    resolveImageIndex(){
        if (this.bottles == 100) {
           return 5;
        } else if (this.bottles  >= 80 && this.bottles < 100) {
            return 4;
        }else if (this.bottles  >= 60 && this.bottles < 80) {
            return 3;
        }else if (this.bottles  >= 40 && this.bottles < 60) {
            return 2;
        }else if (this.bottles  >= 20 && this.bottles < 40) {
            return 1;
        }else if (this.bottles  >= 0 && this.bottles < 20) {
            return 0;
        }
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

