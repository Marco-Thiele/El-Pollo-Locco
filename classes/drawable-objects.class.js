class DrawableObjects {
    x = 120;
    y = 290;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;
    energy = 100;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }



    /**
     * This function load the first images
     * 
     * @param {object} path image path
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * tzhis funktion is for loading i,ages
     * 
     * @param {array} arr images path
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * this function draw the first image
     * 
     * @param {object} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


     /**
     * This function show the image for the status bar
     * 
     * @param {number} percentage 
     */
     setPercentage(percentage){
        this.percentage = percentage;
        let path = this.imagesBar[this.resolveImageIndex()];
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