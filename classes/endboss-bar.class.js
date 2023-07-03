class EndbossBar extends DrawableObjects {
    imagesBar = [
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
        this.loadImages(this.imagesBar);
        this.x = 510;
        this.y = 25;
        this.width = 200;
        this.height= 60;
        this.setPercentage(100);
    }
}

