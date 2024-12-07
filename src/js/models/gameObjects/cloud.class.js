class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    IMAGES_CLOUD_1=[
        "assets/img/3_background/layers/5_clouds/1.png"
    ]

    IMAGES_CLOUD_2=[
        "assets/img/3_background/layers/5_clouds/2.png"
    ]

    constructor() {
        super();
        super.loadImages(this.IMAGES_CLOUD_1);
        super.loadImages(this.IMAGES_CLOUD_2);
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}