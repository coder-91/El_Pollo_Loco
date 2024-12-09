class Character extends MovableObject {
    world;
    offset = {
        x: 13,
        y: 97,
        width: 25,
        height: 110
    };
    collectedBottles = 0;
    collectedCoins = 0;

    audioWalk = new Audio("assets/audio/characters/character/walk.mp3");
    audioJump = new Audio("assets/audio/characters/character/jump.mp3");
    audioSnore = new Audio("assets/audio/characters/character/snore.mp3");
    audioHurt = new Audio("assets/audio/characters/character/hurt.mp3");
    audioDead = new Audio("assets/audio/characters/character/dead.mp3");
    audioCollectBottle = new Audio("assets/audio/collectables/bottle/collect.mp3")
    audioCollectCoin = new Audio("assets/audio/collectables/coin/collect.mp3")

    IMAGES_WALK = [
        "assets/img/4_character/1_walk/1.png",
        "assets/img/4_character/1_walk/2.png",
        "assets/img/4_character/1_walk/3.png",
        "assets/img/4_character/1_walk/4.png",
        "assets/img/4_character/1_walk/5.png",
        "assets/img/4_character/1_walk/6.png",
    ];

    IMAGES_IDLE = [
        "assets/img/4_character/2_idle/1.png",
        "assets/img/4_character/2_idle/2.png",
        "assets/img/4_character/2_idle/3.png",
        "assets/img/4_character/2_idle/4.png",
        "assets/img/4_character/2_idle/5.png",
        "assets/img/4_character/2_idle/6.png",
        "assets/img/4_character/2_idle/7.png",
        "assets/img/4_character/2_idle/8.png",
        "assets/img/4_character/2_idle/9.png",
        "assets/img/4_character/2_idle/10.png",
    ];

    IMAGES_IDLE_LONG = [
        "assets/img/4_character/3_idle_long/1.png",
        "assets/img/4_character/3_idle_long/2.png",
        "assets/img/4_character/3_idle_long/3.png",
        "assets/img/4_character/3_idle_long/4.png",
        "assets/img/4_character/3_idle_long/5.png",
        "assets/img/4_character/3_idle_long/6.png",
        "assets/img/4_character/3_idle_long/7.png",
        "assets/img/4_character/3_idle_long/8.png",
        "assets/img/4_character/3_idle_long/9.png",
        "assets/img/4_character/3_idle_long/10.png",
    ];

    IMAGES_JUMP = [
        "assets/img/4_character/4_jump/1.png",
        "assets/img/4_character/4_jump/2.png",
        "assets/img/4_character/4_jump/3.png",
        "assets/img/4_character/4_jump/4.png",
        "assets/img/4_character/4_jump/5.png",
        "assets/img/4_character/4_jump/6.png",
        "assets/img/4_character/4_jump/7.png",
        "assets/img/4_character/4_jump/8.png",
        "assets/img/4_character/4_jump/9.png",
    ];

    IMAGES_HURT = [
        "assets/img/4_character/5_hurt/1.png",
        "assets/img/4_character/5_hurt/2.png",
        "assets/img/4_character/5_hurt/3.png",
    ];

    IMAGES_DEAD = [
        "assets/img/4_character/6_dead/1.png",
        "assets/img/4_character/6_dead/2.png",
        "assets/img/4_character/6_dead/3.png",
        "assets/img/4_character/6_dead/4.png",
        "assets/img/4_character/6_dead/5.png",
        "assets/img/4_character/6_dead/6.png",
        "assets/img/4_character/6_dead/7.png",
    ];

    constructor() {
        super(
            120,
            172,
            100,
            250,
            10
        );
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.loadImages(this.IMAGES_JUMP);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        super.applyGravity();
        this.animate();
    }

    moveLeft() {
        super.moveLeft();
        this.playAudioWalk();
    }

    moveRight() {
        super.moveRight();
        this.playAudioWalk();
    }

    jump() {
        if(!super.isDead()) {
            super.jump();
            super.speedY = 30;
            this.playAudioJump()
        }
    }

    bounce() {
        if(!super.isDead()) {
            this.speedY = 15;
        }
    }

    collectCoin() {
        this.playAudioCollectCoin();
        return ++this.collectedCoins;
    }

    collectBottle() {
        this.playAudioCollectBottle();
        return ++this.collectedBottles;
    }

    throwBottle() {
        // ToDo Audio
        return --this.collectedBottles;
    }

    animate() {
        setStoppableInterval(() => {
            if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
            }
            if(this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
            }

            if(this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
            }

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setStoppableInterval(() => {
            if(this.isDead()) {
                this.handleDeath();
            }

            else if(this.isHurt()) {
                this.handleHurt();
            }

            else if(this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMP);
            }

            else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALK);
            }

            else if(super.isInactive()) {
                this.handleInactiveState();
            }

            else {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 100)
    }

    playAudioWalk() {
        if (!super.isAboveGround() && !super.isDead()) {
            this.audioWalk.play().then(() => {});
        }
    }

    playAudioJump() {
        this.audioJump.play().then(() => {});
    }

    playAudioCollectCoin() {
        this.audioCollectCoin.play().then(() => {});
    }

    playAudioCollectBottle() {
        this.audioCollectBottle.play().then(() => {});
    }

    handleInactiveState() {
        this.playAnimation(this.IMAGES_IDLE_LONG);
        //this.audioSnore.play().then(() => {});
    }

    handleHurt() {
        this.playAnimation(this.IMAGES_HURT);
        //this.audioHurt.play().then(() => {});
    }

    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        //this.audioDead.play().then(() => {});
    }
}
