class Endboss extends Enemy {
    offset = {
        x: 10,
        y: 62,
        width: 15,
        height: 75
    };
    audioCluck = new Audio("assets/audio/characters/chickenBig/cluck.mp3");
    audioScream = new Audio("assets/audio/characters/chickenBig/scream.mp3");
    audioDead = new Audio("assets/audio/characters/chickenBig/dead.mp3");

    IMAGES_WALK = [
        "assets/img/5_enemies/3_chicken_big/1_walk/1.png",
        "assets/img/5_enemies/3_chicken_big/1_walk/2.png",
        "assets/img/5_enemies/3_chicken_big/1_walk/3.png",
        "assets/img/5_enemies/3_chicken_big/1_walk/4.png",
    ]

    IMAGES_ALERT = [
        "assets/img/5_enemies/3_chicken_big/2_alert/1.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/2.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/3.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/4.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/5.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/6.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/7.png",
        "assets/img/5_enemies/3_chicken_big/2_alert/8.png",
    ]

    IMAGES_ATTACK = [
        "assets/img/5_enemies/3_chicken_big/3_attack/1.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/2.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/3.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/4.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/5.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/6.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/7.png",
        "assets/img/5_enemies/3_chicken_big/3_attack/8.png",
    ]

    IMAGES_HURT = [
        "assets/img/5_enemies/3_chicken_big/4_hurt/1.png",
        "assets/img/5_enemies/3_chicken_big/4_hurt/2.png",
        "assets/img/5_enemies/3_chicken_big/4_hurt/3.png",
    ]

    IMAGES_DEAD = [
        "assets/img/5_enemies/3_chicken_big/5_dead/1.png",
        "assets/img/5_enemies/3_chicken_big/5_dead/2.png",
        "assets/img/5_enemies/3_chicken_big/5_dead/3.png",
    ]

    constructor() {
        super(
            2500,
            45,
            250,
            400,
            0.1
        );
        super.loadImages(this.IMAGES_WALK);
        super.loadImages(this.IMAGES_DEAD);
        this.animate();
    }

    animate() {
        //this.audioScream.play().then(() => {});
        setStoppableInterval(() => {
            if(!super.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStoppableInterval(() => {
            if(!super.isDead()) {
                this.playAnimation(this.IMAGES_WALK);
                //this.audioCluck.play().then(() => {});
            }
        }, 200)

        setStoppableInterval(() => {
            if(super.isDead()) {
                //this.audioDead.play().then(() => {});
            }
        }, 200)
    }
}