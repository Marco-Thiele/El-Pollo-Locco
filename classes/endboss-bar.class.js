class EndbossBar extends DrawableObjects {
    imageEndboss = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];
    percentage = 100;
    otherDirection = true;

    constructor() {
        super();
        this.loadImages(this.imageEndboss);
        this.x = 510;
        this.y = 25;
        this.width = 200;
        this.height= 60;
        this.setPercentage(100);
    }


    /**
     * This function show the image for the status bar
     * 
     * @param {number} percentage 
     */
    setPercentage(percentage){
        this.percentage = percentage;
        let path = this.imageEndboss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    /**
     * This funktion is used for which image should play
     * 
     * @returns a number between 0 and 5
     */
    resolveImageIndex(){
        if (this.percentage == 100) {
           return 5;
        } else if (this.percentage  >= 80 && this.percentage < 100) {
            return 4;
        }else if (this.percentage  >= 60 && this.percentage < 80) {
            return 3;
        }else if (this.percentage  >= 40 && this.percentage < 60) {
            return 2;
        }else if (this.percentage  >= 20 && this.percentage < 40) {
            return 1;
        }else if (this.percentage  >= 0 && this.percentage < 20) {
            return 0;
        }
    }
}

