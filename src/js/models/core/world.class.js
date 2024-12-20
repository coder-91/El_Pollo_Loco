class World {
    static level_end_x = 2200;
    static camera_x = 0;
    // === Needed for pause or resume game ===
    static gameInterval;
    static pauseStartTime = null;
    static totalPausedDuration = 0;
    // ==================================

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.character = new Character();
        this.chickenBig = new ChickenBig();
        this.level = level1;
        this.init();
        this.startGame();
    }

    init() {
        this.setWorld();
        this.runGameLoop();
        this.draw();
    }

    startGame() {
        document.getElementById('start-screen-container').classList.add('d-none');
        document.getElementById('end-screen-container').classList.add('d-none');
    }

    restartGame() {
        this.clearCanvas();
        this.init();
        startGame();
    }

    goToMenu() {
        this.clearCanvas();
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('end-screen-container').classList.add('d-none');
        document.getElementById('start-screen-container').classList.remove('d-none');
    }

    static pauseOrResumeGame() {
        if(World.isGamePaused) {
            World.isGamePaused=false;

            if (World.pauseStartTime !== null) {
                World.totalPausedDuration += Date.now() - World.pauseStartTime;
                World.pauseStartTime = null;
            }

            world.runGameLoop();
            requestAnimationFrame(() => world.draw());
        } else {
            World.isGamePaused=true;
            clearInterval(World.gameInterval);
            World.pauseStartTime = Date.now();
        }
    }

    handleEnemyWithThrowableBottleCollision() {
        this.character.throwableBottles.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    bottle.splash();
                    enemy.reduceEnergy();
                }
            });
        });
    }

    handleChickenBigWithThrowableBottleCollision() {
        this.character.throwableBottles.forEach((bottle) => {
            if(this.chickenBig.isColliding(bottle)) {
                this.chickenBig.reduceEnergy();
                this.chickenBig.statusBarHealth.setValue(this.chickenBig.energy);
                bottle.splash();
            }
        });
    }

    handleCharacterWithEnemyCollision() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isAboveGround() && this.character.isColliding(enemy) && !enemy.isDead()) {
                enemy.energy = 0;
                this.character.bounce();
            }

            else if (!this.character.isAboveGround() && this.character.isColliding(enemy) && !enemy.isDead()) {
                    this.character.reduceEnergy();
                    this.character.statusBarHealth.setValue(this.character.energy);
            }
        })
    }

    handleCharacterWithCoinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && !this.character.statusBarCoin.isFull()) {
                this.character.collectCoin();
                this.character.statusBarCoin.setValue(this.character.collectedCoins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    handleCharacterWithBottleCollision() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !this.character.statusBarBottle.isFull()) {
                this.character.collectBottle();
                this.character.statusBarBottle.setValue(this.character.collectedBottles);
                this.level.bottles.splice(index, 1);
            }
        });
    }

    handleCharacterNearEndBoss() {
        if (this.chickenBig.x - this.character.x < (CANVAS.WIDTH / 3 * 2) ) {
            this.chickenBig.statusBarHealth.y = 30;
        }
    }

    setWorld() {
        this.character.world = this;
    }

    runGameLoop() {
        if (World.gameInterval) {
            clearInterval(World.gameInterval);
        }

        World.gameInterval = setInterval(() => {
            this.handleEnemyWithThrowableBottleCollision();
            this.handleChickenBigWithThrowableBottleCollision();
            this.handleCharacterWithBottleCollision();
            this.handleCharacterWithCoinCollision();
            this.handleCharacterWithEnemyCollision();
            this.handleCharacterNearEndBoss();
        }, 20);
    }

    draw() {
        if (!World.isGamePaused && !this.character.isDead() && this.chickenBig.statusBarHealth.value > 0) {
            this.clearCanvas();
            this.drawGameElements();
            requestAnimationFrame(this.draw.bind(this));
        }

        if(this.character.isDead()) {
            this.showEndScreen();
        }

        if(this.chickenBig.statusBarHealth.value <= 0 && !this.character.isDead()) {
            this.showEndScreen();
        }

    }

    showEndScreen() {
        document.getElementById('end-screen-container').classList.remove('d-none');
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGameElements() {
        this.ctx.translate(World.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        // START: MOVING ELEMENTS
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);

        // START: SPACE FOR FIXED OBJECTS
        this.ctx.translate(-World.camera_x, 0);
        this.addToMap(this.character.statusBarHealth);
        this.addToMap(this.character.statusBarCoin);
        this.addToMap(this.character.statusBarBottle);
        this.addToMap(this.chickenBig.statusBarHealth);
        this.ctx.translate(World.camera_x, 0);
        // END: SPACE FOR FIXED OBJECTS

        this.addToMap(this.character);
        this.addToMap(this.chickenBig);
        this.addObjectsToMap(this.character.throwableBottles);
        // END: MOVING ELEMENTS
        this.ctx.translate(-World.camera_x, 0);
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => this.addToMap(obj));
    }

    addToMap(mo) {
        if (mo.isFacingOtherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.isFacingOtherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x *= -1;
    }

    flipImageBack(mo) {
        mo.x *= -1;
        this.ctx.restore();
    }
}
