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
     * This funktion shows the hitboxes
     * 
     * @param {object} ctx 
     */
    drawFrame(ctx) {
       /* if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }*/
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
}