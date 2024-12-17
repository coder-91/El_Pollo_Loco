class ThrowableBottle extends ThrowableObject {
    IMAGES_BOTTLE_ROTATION=[
        "assets/img/7_bottle/2_rotation/1.png",
        "assets/img/7_bottle/2_rotation/2.png",
        "assets/img/7_bottle/2_rotation/3.png",
        "assets/img/7_bottle/2_rotation/4.png",
    ]

    IMAGES_BOTTLE_SPLASH=[
        "assets/img/7_bottle/3_splash/1.png",
        "assets/img/7_bottle/3_splash/2.png",
        "assets/img/7_bottle/3_splash/3.png",
        "assets/img/7_bottle/3_splash/4.png",
        "assets/img/7_bottle/3_splash/5.png",
        "assets/img/7_bottle/3_splash/6.png",
    ]

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.offset = {
            x: 0,
            y: 0,
            width: 0,
            height: 0
        };
        this.speedX = 20;
        this.speedY = 30;
        this.acceleration = 2.5;
        super.loadImage("assets/img/7_bottle/2_rotation/1.png");
    }

    throw() {
        super.throw();
        this.speedY = 30;
        setStoppableInterval(() => {
            this.isFacingOtherDirection ? this.x -=10 : this.x +=10;
        }, 25)
    }

    rotate() {

    }

    splash() {
        //audioBottleSplash = new Audio("assets/audio/collectables/bottle/splash.mp3");
    }
}