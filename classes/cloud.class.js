class cloud extends MovebleObject {
    y = 30;
    width = 600
    height = 200;
    imagesclouds = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png',
    ]
    

    constructor(imagesclouds) {
        super().loadImage(imagesclouds)

        this.x = 0 + Math.random() * 2500; //  immer eine Zahl Zwischen 200 und 700   Math.random() ist immer eine Zahl wischen  0 und 1

        this.animate();
    }


    /**
     * This function is for animate the clouds
     * 
     */
    animate() {
        this.moveLeft();
    }


}