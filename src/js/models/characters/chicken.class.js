class Chicken extends BasicChicken {
    offset = {
        x: 0,
        y: 3,
        width: 0,
        height: 8
    };

    IMAGES_WALK = [
        "assets/img/5_enemies/2_chicken_normal/1_walk/1.png",
        "assets/img/5_enemies/2_chicken_normal/1_walk/2.png",
        "assets/img/5_enemies/2_chicken_normal/1_walk/3.png",
    ]

    IMAGES_DEAD = [
        "assets/img/5_enemies/2_chicken_normal/2_dead/1.png"
    ]

    constructor(index) {
        super(
            BasicChicken.basePosition + index * BasicChicken.step + (Math.random() * 100 - 50),
            354,
            80,
            60,
            0.25 + Math.random() * (0.75 - 0.25)
        );
        super.loadImages(this.IMAGES_WALK);
        super.loadImages(this.IMAGES_DEAD);
        super.animate();
    }
}
