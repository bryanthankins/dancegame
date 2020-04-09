
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {

    // Defaults
    this.failCounter = 0;
    this.fastClickCount = 0;
    this.gameRunning = false;
    this.moveCounter = 0;
    this.currScore = 0;

    // Configs
    this.version = "7.1";
    this.simultaneousArrows = 1;
    this.arrowInterval = 1.3;
    this.level = 1;
    this.successSpeedTime = 0.37;
    this.arrowPoints = 25;


     // Game set-up
    this.gameTimer = this.game.time.time;
   
    // Add music
    this.song1 = this.game.add.audio('song1', 0.5, true);
    this.song2 = this.game.add.audio('song2', 0.5, true);
    this.song3 = this.game.add.audio('song3', 0.5, true);
    this.startSound = this.game.add.audio('start');
    this.successSound = this.game.add.audio('success');
    this.missSound = this.game.add.audio('miss');
    this.endSound = this.game.add.audio('end');

    // // Background
    this.stage0 = this.game.add.image(this.world.centerX, this.world.centerY, 'stage0');
    this.stage0.visible = true;
    this.stage0.anchor.setTo(0.5);
    this.stage0.smoothed = false;

    this.stage1 = this.game.add.image(this.world.centerX, this.world.centerY, 'stage1');
    this.stage1.visible = false;
    this.stage1.anchor.setTo(0.5);
    this.stage1.smoothed = false;

    this.stage2 = this.game.add.image(this.world.centerX, this.world.centerY, 'stage2');
    this.stage2.visible = false;
    this.stage2.anchor.setTo(0.5);
    this.stage2.smoothed = false;

    this.stage3 = this.game.add.image(this.world.centerX, this.world.centerY, 'stage3');
    this.stage3.visible = false;
    this.stage3.anchor.setTo(0.5);
    this.stage3.smoothed = false;

    this.back = this.stage2;
    

    // // Add Text
    this.bmpText = this.game.add.bitmapText(this.world.centerX, this.world.centerY - 150, 'carrier_command', 'SOCIAL DISTANCE', 30);
    this.bmpText.smoothed = false;
    this.bmpText.anchor.setTo(0.5);

    this.bmpText2 = this.game.add.bitmapText(this.world.centerX, this.world.centerY - 100, 'carrier_command', 'Dancing', 25);
    this.bmpText2.anchor.setTo(0.5);
    this.bmpText2.smoothed = false;

    this.scoreText = this.game.add.bitmapText(this.world.centerX + 175, this.world.centerY - 275, 'carrier_command', 'Score: 0', 24);
    this.scoreText.anchor.setTo(0.5);
    this.scoreText.smoothed = false;
    this.scoreText.visible = false;

    this.versionText = this.game.add.bitmapText(this.world.centerX - 175, this.world.centerY - 275, 'carrier_command', 'Version: ' + this.version, 24);
    this.versionText.anchor.setTo(0.5);
    this.versionText.smoothed = false;
    this.versionText.visible = false;

    this.levelText = this.game.add.bitmapText(this.world.centerX - 175, this.world.centerY + 285, 'carrier_command', 'Level: ', 20);
    this.levelText.anchor.setTo(0.5);
    this.levelText.smoothed = false;
    this.levelText.visible = false;

    this.charText = this.game.add.bitmapText(this.world.centerX + 175, this.world.centerY + 285, 'carrier_command', 'Player: ', 20);
    this.charText.anchor.setTo(0.5);
    this.charText.smoothed = false;
    this.charText.visible = false;
   

    // // Dancer
    this.dancers = this.game.add.group();
    this.dancers.create(this.world.centerX, this.world.centerY + 175, 'dancer1', 5);
    this.dancers.create(this.world.centerX, this.world.centerY + 175, 'dancer2', 5);
    this.dancers.create(this.world.centerX, this.world.centerY + 175, 'dancer3', 5);
    this.dancers.forEach(function (dancer) {
        dancer.anchor.setTo(0.5);
        dancer.scale.set(3);
        dancer.smoothed = false;
        dancer.visible = false;
        dancer.animations.add('dance1', [0, 1, 2, 3, 4, 5, 6, 7]);
        dancer.animations.add('dance2', [8, 9, 10, 11, 12, 13, 14, 15, 16]);
        dancer.animations.add('dance3', [17, 18, 19, 20, 21, 22, 23, 24, 25]);
        dancer.animations.add('dance4', [26, 27, 28, 29, 30, 31, 32, 33, 34]);
        dancer.frame = 0; //happy frame
    });

    // explosion
    this.explosionAnimation = this.game.add.sprite(0, 0, 'kaboom');
    this.explosionAnimation.anchor.setTo(0.5, 0.5);
    this.explosionAnimation.scale.set(3);
    this.explosionAnimation.animations.add('kaboom');
    this.explosionAnimation.visible = false;
  

    // // Arrows
    this.arrows = this.game.add.group();
    this.arrows.create(this.world.centerX - 115, this.world.centerY + 150, 'arrow').angle = 180;
    this.arrows.getAt(0).events.onInputDown.add(this.arrowClick,this);
    this.arrows.create(this.world.centerX + 115, this.world.centerY + 150, 'arrow').angle = 0;
    this.arrows.getAt(1).events.onInputDown.add(this.arrowClick,this);
    this.arrows.create(this.world.centerX, this.world.centerY + 35, 'arrow').angle = -90;
    this.arrows.getAt(2).events.onInputDown.add(this.arrowClick,this);
    this.arrows.create(this.world.centerX - 205, this.world.centerY + 150, 'slidearrow').angle = 180;
    this.arrows.getAt(3).events.onInputDown.add(this.arrowClick,this);
    this.arrows.create(this.world.centerX + 205, this.world.centerY + 150, 'slidearrow').angle = 0;  
    this.arrows.getAt(4).events.onInputDown.add(this.arrowClick,this);
    this.arrows.create(this.world.centerX + 205, this.world.centerY - 110, 'diagonalarrow').angle = -45;   
    this.arrows.getAt(5).events.onInputDown.add(this.arrowClick,this);
    this.arrows.create(this.world.centerX - 205, this.world.centerY - 110, 'diagonalarrow').angle = -125;   
    this.arrows.getAt(6).events.onInputDown.add(this.arrowClick,this);
    this.arrows.forEach(function (arrow) {
        arrow.anchor.setTo(0.5, 0.5);
        arrow.visible = false;
        arrow.scale.set(1.4);
        arrow.smoothed = false;
        arrow.inputEnabled = true;
    });
 

    // Portraits
    this.portraits = this.game.add.group();
    this.portraits.create(this.world.centerX - 245, this.world.centerY - 250, 'portrait1').events.onInputDown.add(this.portraitClick, this);
    this.portraits.create(this.world.centerX, this.world.centerY - 250, 'portrait2').events.onInputDown.add(this.portraitClick, this);
    this.portraits.create(this.world.centerX + 245, this.world.centerY - 250, 'portrait3').events.onInputDown.add(this.portraitClick, this);
    this.portraits.forEach(function (portrait) {
        portrait.anchor.setTo(0.5);
        portrait.smoothed = false;
        portrait.scale.set(2);
        portrait.inputEnabled = true;
    });

    // Start Button
    this.startBtn = this.game.add.sprite(this.world.centerX, this.world.centerY, 'startBtn');
    this.startBtn.anchor.setTo(0.5);
    this.startBtn.scale.set(2);
    this.startBtn.smoothed = false;
    this.startBtn.inputEnabled = true;
    this.startBtn.visible = false;
    this.startBtn.events.onInputDown.add(this.startGame, this);
    this.add.tween(this.startBtn).to({ y: 275 }, 100).easing(Phaser.Easing.Bounce.Out).start();
    this.add.tween(this.startBtn).to({ angle: -2 }, 500).to({ angle: 2 }, 1000).to({ angle: 0 }, 500).loop().start();

    },

    update: function () {
        if (this.game.time.elapsedSecondsSince(this.gameTimer) > this.arrowInterval && this.gameRunning) {
            this.gameTimer = this.game.time.time;
    
            this.startNewMove();
    
            // Speed up & Add more arrows
            if(this.level == 1) {
                if (this.currScore > 500 && this.currScore < 1500) {
                    this.arrowInterval = 1.1;
                } else if (this.currScore > 1500 && this.currScore < 2500) {
                    this.arrowInterval = 1.0;                        
                } else if (this.currScore > 3500 && this.currScore < 4000) {
                    this.arrowInterval = 1.0;
                    this.simultaneousArrows = 2;
                } else if (this.currScore > 4000) {
                    this.arrowInterval = 0.85;                      
                    this.simultaneousArrows = 3;
                }
            }
            else if(this.level == 2)
            {
                if (this.currScore > 500 && this.currScore < 1500) {
                    this.arrowInterval = 1.1;
                } else if (this.currScore > 1500 && this.currScore < 2500) {
                    this.arrowInterval = 1.0;
                    this.simultaneousArrows = 2;
                } else if (this.currScore > 3500 && this.currScore < 4000) {
                    this.arrowInterval = 0.8;
                    this.simultaneousArrows = 3;
                } else if (this.currScore > 4000) {
                    this.arrowInterval = 0.7;
                    this.simultaneousArrows = 4;
                }
            }
            else if(this.level == 3){
                if (this.currScore > 500 && this.currScore < 1500) {
                    this.arrowInterval = 0.8;
                    this.simultaneousArrows = 2;
                } else if (this.currScore > 1500 && this.currScore < 2500) {
                    this.arrowInterval = 0.7;
                    this.simultaneousArrows = 3;
                } else if (this.currScore > 3500 && this.currScore < 4000) {
                    this.arrowInterval = 0.6;
                } else if (this.currScore > 6000) {
                    this.arrowInterval = 0.5;
                    this.simultaneousArrows = 4;
                } else if (this.currScore > 8000) {
                    this.arrowInterval = 0.45;
                } else if (this.currScore > 9000) {
                    this.arrowInterval = 0.40;
                }
                
            }
            
        }

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
       // this.state.start('MainMenu');

    },

    portraitClick: function (portrait) {
        if(this.dancer) {
            this.dancer.visible = false;
        }
    
        if(this.music) {
            this.music.pause();
        }
    
        if(this.back) {
            this.back.visible = false;
        }
    
        
        this.startSound.play();
    
        var difficultyText;
        var playerText;
        if(portrait.key == 'portrait3') {
            this.level = 3;
            difficultyText  = "Level: Hard";
            playerText = "Player: Jaana";
            this.music = this.song3;
            this.back  = this.stage3;
            this.winScore = 10000;
            this.arrowInterval = 1.0;
        }else if(portrait.key == 'portrait2') {
            this.level = 2;
            difficultyText  = "Level: Med";
            playerText = "Player: Caleb";
            this.music = this.song2;
            this.back  = this.stage2;
            this.winScore = 6000;
            this.arrowInterval = 1.1;
        } else {
            this.level = 1;
            difficultyText  = "Level: Easy";
            playerText = "Player: Bri";
            this.music = this.song1;
            this.successSpeedTime = 0.45;
            this.winScore = 3500;
            this.back = this.stage1;
        }
        this.music.play();
        this.back.visible = true;
        
        this.dancer = this.dancers.getAt(this.level - 1);
        this.dancer.visible = true;
        this.dancer.animations.play('dance' + this.game.rnd.integerInRange(1, 4), 10, true);
        this.startBtn.visible = true;
        this.levelText.text = difficultyText;
        this.levelText.visible = true;
        this.charText.text = playerText;
        this.charText.visible = true;
    },
      
    
    startGame: function () {
        this.music.restart();
        this.portraits.forEach(function (portrait) {
            portrait.visible = false;
        });
        this.dancer.animations.play('dance' + this.game.rnd.integerInRange(1, 4), 10, true);
        this.back.inputEnabled = false;
        this.bmpText.visible = false;
        this.bmpText2.visible = false;
        this.startBtn.visible = false;
        this.scoreText.visible = true;
        this.versionText.visible = true;
        this.levelText.visible = false;
        this.charText.visible = false;
        this.startSound.play();
        this.gameRunning = true;
    
    },
    
    
    endGame: function() {
        this.gameRunning = false
        var failText = this.game.add.bitmapText(this.world.centerX, this.world.centerY - 70, 'carrier_command', 'GAME OVER', 44);
        failText.anchor.x = 0.5;
        this.dancer.animations.stop(null, true);
        this.dancer.frame = 7; //sad frame
        this.endSound.play();
        this.music.pause();
        this.moveCounter = 0;
    
    },
    
    runMissLogic: function() {
        this.failCounter += 1;
        var missText = this.game.add.bitmapText(this.world.centerX, this.world.centerY, 'carrier_command', this.getNegativePhrase(), 24);
        missText.anchor.setTo(0.5);
        missText.smoothed = false;

        this.game.add.tween(missText).to({ y: 0 }, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(missText).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
        this.game.add.tween(missText).to({ angle: -50 }, 500).to({ angle: 50 }, 1000).to({ angle: -50 }, 500).loop().start();

        this.missSound.play();
    },
    
    
    
     startNewMove: function () {
        this.moveCounter++;
        
        hasVisibleArrows = false;
        this.arrows.forEach(function (arrow) {
            if (arrow.visible) {
                hasVisibleArrows = true;
                arrow.visible = false;
            }
        });
    
        if (hasVisibleArrows) {
            this.runMissLogic();
            if (this.failCounter > 2) {
                this.endGame();
            }
        }
        else {
            this.failCounter = 0;
        }
    
        // Get new random arrow and show
        var newArrow = this.arrows.getRandom();
        newArrow.visible = true;
        newArrow.shownTime = this.game.time.time;
        
        if(this.simultaneousArrows > 1 && this.game.rnd.integerInRange(1,3) == 2){
            var secondArrow = this.arrows.getRandom();
            secondArrow.visible = true;
            secondArrow.shownTime = this.game.time.time;
        }
    
        if(this.simultaneousArrows > 2 && this.game.rnd.integerInRange(1,2) == 2){
            var thirdArrow = this.arrows.getRandom();
            thirdArrow.visible = true;
            thirdArrow.shownTime = this.game.time.time;
        }
        if(this.simultaneousArrows > 3 && this.game.rnd.integerInRange(1,2) == 2){
            var fourthArrow = this.arrows.getRandom();
            fourthArrow.visible = true;
            fourthArrow.shownTime = this.game.time.time;
        }
    
    },
    
    
    getPostivePhrase: function () {
        var positivePhrase = [
            "AWESOME!",
            "NICE!",
            "Oh Yeah!",
            "Rock on!",
            "Woah! Nice!",
            "Beast Mode!"
        ];
    
        var randomNum = this.game.rnd.integerInRange(0, 5);
        return positivePhrase[randomNum];
    
    },
    
    
    getNegativePhrase: function () {
        var positivePhrase = [
            "BOO!",
            "SAD!",
            "Umm...!",
            "FAIL!",
            "You Suck!",
            "Off Beat!"
        ];
    
        var randomNum = this.game.rnd.integerInRange(0, 5);
        return positivePhrase[randomNum];
    
    },
    
    arrowClick: function (arrow) {
        //hide  arrow
        var timeToClickArrow = this.game.time.elapsedSecondsSince(arrow.shownTime);
        if (timeToClickArrow < this.successSpeedTime) {
            var bonusText = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'carrier_command', this.getPostivePhrase(), 24);
            bonusText.anchor.setTo(0.5);
            bonusText.smoothed = false;
    
            this.game.add.tween(bonusText).to({ y: 0 }, 1500, Phaser.Easing.Linear.None, true);
            this.game.add.tween(bonusText).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.None, true);
          
            this.currScore += 50;
            this.fastClickCount += 1;
            if (this.fastClickCount >= 3) {
                this.explosionAnimation.visible = true;
                this.explosionAnimation.reset(arrow.x, arrow.y);
                this.explosionAnimation.play('kaboom', 30, false, true);
    
            } 
        }
        else {
            this.fastClickCount  = 0;                
        }
    
        this.successSound.play();
    
        this.currScore += this.arrowPoints;
        this.scoreText.text = 'Score:' + this.currScore;
    
    
        arrow.visible = false;
        this.dancer.animations.play('dance' + this.game.rnd.integerInRange(1, 4), 10, true);
        if (arrow.key == 'slidearrow') {
            var slideOffset = 0;
            var rotateOffset = 0;
            if (arrow.angle == 0) {
                slideOffset = 200;
                rotateOffset = 15
            }
            else {
                slideOffset = -200;
                rotateOffset = -15
            }
            this.game.add.tween(this.dancer).to({ x: this.game.world.centerX + slideOffset }, 500).to({ x: this.game.world.centerX }, 500).start();
            this.game.add.tween(this.dancer).to({ angle: rotateOffset }, 500).to({ angle: 2 }, 500).to({ angle: 0 }, 500).start();
        }
        else if(arrow.key == 'diagonalarrow'){
            if(arrow.angle == -45){
                this.game.add.tween(this.dancer).to({ angle: 360 }, 500).start();
            } else {
                this.game.add.tween(this.dancer).to({ angle: -360 }, 500).start();
            }
        } else if (arrow.angle == -90) {
            this.game.add.tween(this.dancer).to({ y: this.game.world.centerY + 105 }, 200).to({ y: this.game.world.centerY + 175 }, 200).start();
        }
    
        if(this.currScore >= this.winScore) {
            this.endGame();
        }
    }

};