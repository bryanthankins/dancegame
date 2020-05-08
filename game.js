
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
    this.angle = 0;

    // Configs
    this.allowExplosions = false;
    this.version = "7.7";
    this.simultaneousArrows = 1;
    this.arrowInterval = 1.3;
    this.level = 1;
    this.successSpeedTime = 0.37;
    this.arrowPoints = 25;


     // Game set-up
    this.gameTimer = this.game.time.time;
   
    // Add music
    this.song1 = this.game.add.audio('song1', 1, true);
    this.song2 = this.game.add.audio('song2', 1, true);
    this.song3 = this.game.add.audio('song3', 1, true);
    this.startSound = this.game.add.audio('start');
    this.successSound = this.game.add.audio('success');
    this.missSound = this.game.add.audio('miss');
    this.endSound = this.game.add.audio('end');
    this.winSound = this.game.add.audio('win');
    this.applauseSound = this.game.add.audio('applause');
    this.booSound = this.game.add.audio('boo');

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

    this.tiger = this.game.add.image(this.world.centerX, this.world.centerY, 'tiger');
    this.tiger.visible = false;
    this.tiger.anchor.setTo(0.5);
    this.tiger.smoothed = false;
    this.tiger.alpha = 0.4;

    this.back = this.stage0;

    this.chooseCharText = this.game.add.bitmapText(this.world.centerX, this.world.centerY - 75, 'carrier_command', 'Choose Character to Start', 15);
    this.chooseCharText.smoothed = false;
    this.chooseCharText.anchor.setTo(0.5);

    //this.scoreText = this.game.add.text(this.world.centerX + 175, this.world.centerY - 275, "SCORE: 0");
    this.scoreText = this.game.add.text(this.world.centerX, this.world.centerY - 275, "SCORE: 0");
    this.scoreText.anchor.setTo(0.5, 0.5);
    this.scoreText.font = 'Press Start 2P';
    this.scoreText.fontSize = 25;
    this.scoreGrd = this.scoreText.context.createLinearGradient(0, 0, 0, this.scoreText.canvas.height);
    this.scoreGrd.addColorStop(0, '#FFFFCC');   
    this.scoreGrd.addColorStop(1, '#FFFF13');
    this.scoreText.fill = this.scoreGrd;
    this.scoreText.visible = false;
    this.scoreText.align = 'center';
    this.scoreText.stroke = '#000000';
    this.scoreText.strokeThickness = 2;
   // this.scoreText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);


    this.versionText = this.game.add.bitmapText(this.world.centerX - 175, this.world.centerY - 275, 'carrier_command', 'Version: ' + this.version, 24);
    this.versionText.anchor.setTo(0.5);
    this.versionText.smoothed = false;
    this.versionText.visible = false;

    this.levelText = this.game.add.group();
    this.level1Text = this.game.add.bitmapText(this.world.centerX - 245, this.world.centerY - 275, 'carrier_command', 'Easy', 18, this.levelText);
    this.level2Text = this.game.add.bitmapText(this.world.centerX, this.world.centerY - 275, 'carrier_command', 'Med', 18, this.levelText);
    this.level3Text = this.game.add.bitmapText(this.world.centerX + 245, this.world.centerY - 275, 'carrier_command', 'Hard', 18, this.levelText);
    this.levelText.forEach(function (text) {
        text.anchor.setTo(0.5);
        text.smoothed = false;
    });
    
    this.charText = this.game.add.bitmapText(this.world.centerX, this.world.centerY, 'carrier_command', '', 20);
    this.charText.anchor.setTo(0.5);
    this.charText.smoothed = false;
    this.charText.visible = false;


    // Title text
    this.titleText = this.game.add.text(this.world.centerX, this.world.centerY - 135, "SOCIAL DISTANCE \nDANCING");
    this.titleText.anchor.setTo(0.5);

    this.titleText.font = 'Press Start 2P';
    this.titleText.fontSize = 35;

    this.grd = this.titleText.context.createLinearGradient(0, 0, 0, this.titleText.canvas.height);
    this.grd.addColorStop(0, '#FFFFCC');   
    this.grd.addColorStop(1, '#FFFF13');
    this.titleText.fill = this.grd;

    this.titleText.align = 'center';
    this.titleText.stroke = '#000000';
    this.titleText.strokeThickness = 2;
    //this.titleText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    // Fail Text
    this.failText = this.game.add.text(this.world.centerX, this.world.centerY - 70, "GAME OVER");
    this.failText.anchor.setTo(0.5);

    this.failText.font = 'Press Start 2P';
    this.failText.fontSize = 50;

    this.grd = this.failText.context.createLinearGradient(0, 0, 0, this.failText.canvas.height);
    this.grd.addColorStop(0, '#FFFFCC');   
    this.grd.addColorStop(1, '#FFFF13');
    this.failText.fill = this.grd;

    this.failText.align = 'center';
    this.failText.stroke = '#000000';
    this.failText.strokeThickness = 2;
    //this.failText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    this.failText.anchor.x = 0.5;
    this.failText.visible = false;

    // Win Text
    this.winText = this.game.add.text(this.world.centerX, this.world.centerY - 70, "YOU WIN!");
    this.winText.anchor.setTo(0.5);

    this.winText.font = 'Press Start 2P';
    this.winText.fontSize = 60;

    this.grd = this.winText.context.createLinearGradient(0, 0, 0, this.winText.canvas.height);
    this.grd.addColorStop(0, '#FFFFCC');   
    this.grd.addColorStop(1, '#FFFF13');
    this.winText.fill = this.grd;

    this.winText.align = 'center';
    this.winText.stroke = '#000000';
    this.winText.strokeThickness = 2;
    //this.winText.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    this.winText.anchor.x = 0.5;
    this.winText.visible = false;



        


    // Dancer
    this.dancers = this.game.add.group();
    this.dancer1 = this.game.add.sprite(this.world.centerX, this.world.centerY + 145, 'dancer1');
    this.dancer1.animations.add('dance1', [0, 1, 2, 3, 4, 5]);
    this.dancer1.animations.add('dance2', [6,7,8,9,10,11,12,13]);
    this.dancer1.animations.add('dance3', [14,15,16,17,18,19]);
    this.dancer1.animations.add('dance4', [20,21,22,23,24,25,26,27]);
    this.dancer1.animations.add('dance5', [28,29,30,31,32,33,34]);
    this.dancer1.animations.add('dance6', [35,36,37,38,39,40,41,42]);
    this.dancer1.animations.add('dance7', [43,44,45,46,47,48,49,50]);
    this.dancer1.animations.add('dance8', [51,52,53,54,55,56]);
    this.dancer1.animations.add('dance9', [57,58,59,60,61,62,63]);
    this.dancer1.animations.add('dance10', [64,65,66,67,68,69,70]);
    this.dancers.add(this.dancer1);

    this.dancer2 = this.game.add.sprite(this.world.centerX, this.world.centerY + 145, 'dancer2');
    this.dancer2.animations.add('dance1', [0, 1, 2, 3, 4, 5]);
    this.dancer2.animations.add('dance2', [6,7,8,9,10,11,12,13]);
    this.dancer2.animations.add('dance3', [14,15,16,17,18,19]);
    this.dancer2.animations.add('dance4', [20,21,22,23,24,25,26,27]);
    this.dancer2.animations.add('dance5', [28,29,30,31,32,33,34]);
    this.dancer2.animations.add('dance6', [35,36,37,38,39,40,41,42]);
    this.dancer2.animations.add('dance7', [43,44,45,46,47,48,49,50]);
    this.dancer2.animations.add('dance8', [51,52,53,54,55,56]);
    this.dancer2.animations.add('dance9', [57,58,59,60,61,62,63,63]);
    this.dancer2.animations.add('dance10', [64,66,67,68]);
    this.dancers.add(this.dancer2);

    this.dancer3 = this.game.add.sprite(this.world.centerX, this.world.centerY + 145, 'dancer3');
    this.dancer3.animations.add('dance1', [0, 1, 2, 3, 4, 5]);
    this.dancer3.animations.add('dance2', [6,7,8,9,10,11,12,13]);
    this.dancer3.animations.add('dance3', [14,15,16,17,18,19]);
    this.dancer3.animations.add('dance4', [20,21,22,23,24,25,26,27]);
    this.dancer3.animations.add('dance5', [28,29,30,31,32,33,34]);
    this.dancer3.animations.add('dance6', [35,36,37,38,39,40,41,42]);
    this.dancer3.animations.add('dance7', [43,44,45,46,47,48,49,50]);
    this.dancer3.animations.add('dance8', [51,52,53,54,55,56]);
    this.dancer3.animations.add('dance9', [57,58,59,60,61,62,63,64]);
    this.dancer3.animations.add('dance10', [65,66,67,68,69,70]);
    this.dancers.add(this.dancer3);
    this.dancers.forEach(function (dancer) {
        dancer.anchor.setTo(0.5);
        dancer.scale.set(3);
        dancer.smoothed = false;
        dancer.visible = false;     
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
    this.arrows.create(this.world.centerX, this.world.centerY - 50, 'arrow').angle = -90;
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
    this.portraits.create(this.world.centerX - 245, this.world.centerY - 225, 'portrait1').events.onInputDown.add(this.portraitClick, this);
    this.portraits.create(this.world.centerX, this.world.centerY - 225, 'portrait2').events.onInputDown.add(this.portraitClick, this);
    this.portraits.create(this.world.centerX + 245, this.world.centerY - 225, 'portrait3').events.onInputDown.add(this.portraitClick, this);
    this.portraits.forEach(function (portrait) {
        portrait.anchor.setTo(0.5);
        portrait.smoothed = false;
        portrait.scale.set(2);
        portrait.inputEnabled = true;
    });

    // Start Button
    this.startBtn = this.game.add.sprite(this.world.centerX, this.world.centerY - 55, 'startBtn');
    this.startBtn.anchor.setTo(0.5);
    this.startBtn.scale.set(2);
    this.startBtn.smoothed = false;
    this.startBtn.inputEnabled = true;
    this.startBtn.visible = false;
    this.startBtn.events.onInputDown.add(this.startGame, this);
    //this.add.tween(this.startBtn).to({ y: 275 }, 100).easing(Phaser.Easing.Bounce.Out).start();
    this.add.tween(this.startBtn).to({ angle: -2 }, 500).to({ angle: 2 }, 1000).to({ angle: 0 }, 500).loop().start();
    
    // Spotlight
    this.spotlight = this.game.add.sprite(this.world.centerX, this.world.centerY, 'spotlight');
    this.spotlight.anchor.setTo(0.5);
    this.spotlight.alpha = 0.7;
    this.spotlight.smoothed = false;
    this.spotlight.visible = false;


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


            // more interesting ramp up
            if (this.currScore > 250 && this.currScore < 750) {
                this.spotlight.visible = true;
            }
            // } else if (this.currScore > 750 && this.currScore < 1250) {
            //     this.allowExplosions = true;
            // } else if (this.currScore > 1250 && this.currScore < 4000) {
            //     // this.allowExplosions = false;
            //     // //this.back.visible = false;
            //     // this.tiger.visible = true;
            //     // this.back = this.tiger;

            // } else if (this.currScore > 4000) {
               
            // }
            
        }

        


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
    
        this.chooseCharText.visible = false;
        this.startSound.play();
    
        var difficultyText;
        var playerText;
        if(portrait.key == 'portrait3') {
            this.level = 3;
            difficultyText  = "Level: Hard";
            playerText = "Jaana";
            this.music = this.song3;
            this.back  = this.stage3;
            this.winScore = 10000;
            this.arrowInterval = 1.0;
        }else if(portrait.key == 'portrait2') {
            this.level = 2;
            difficultyText  = "Level: Med";
            playerText = "Brianna";
            this.music = this.song2;
            this.back  = this.stage2;
            this.winScore = 6000;
            this.arrowInterval = 1.1;
        } else {
            this.level = 1;
            difficultyText  = "Level: Easy";
            playerText = "Seiko";
            this.music = this.song1;
            this.successSpeedTime = 0.45;
            this.winScore = 3500;
            this.back = this.stage1;
        }
        this.music.play('', 0, 1, true);
        this.back.visible = true;
        
        this.dancer = this.dancers.getAt(this.level - 1);
        this.dancer.visible = true;
        this.dancer.animations.play('dance1', 10, true);
        this.startBtn.visible = true;
        this.charText.text = playerText;
        this.charText.visible = true;
    },
      
    
    startGame: function () {
        this.music.restart('', 0, 1, true);
        this.portraits.forEach(function (portrait) {
            portrait.visible = false;
        });
        this.dancer.animations.play('dance' + this.game.rnd.integerInRange(1, 4), 10, true);
        this.titleText.visible = false;
        this.startBtn.visible = false;
        this.scoreText.visible = true;
        // this.versionText.visible = true;
        this.levelText.visible = false;
        this.charText.visible = false;
        this.startSound.play();
        this.gameRunning = true;
    
    },
    backToMenu: function() {
        if(this.manager) {
            this.emitter.renderer.display.visible = false
            this.manager.destroy();
        }

        this.arrows.forEach(function (arrow) {
            if (arrow.visible) {
                arrow.visible = false;
            }
        });
        this.portraits.forEach(function (portrait) {
            portrait.visible = true;
        });

        this.back.visible = false;
        this.back = this.stage0;
        this.back.visible = true;

        this.spotlight.visible = false;

        this.dancer.visible = false;
        this.titleText.visible = true;
        this.scoreText.visible = false;
        this.versionText.visible = false;
        this.chooseCharText.visible = true;
        this.failText.visible = false;
        this.winText.visible = false;
        this.scoreText.text = "SCORE: 0";
        this.currScore = 0;
        //Reset to default configs
        this.allowExplosions = false;
        this.simultaneousArrows = 1;
        this.arrowInterval = 1.3;
        this.level = 1;
        this.successSpeedTime = 0.37;
        this.arrowPoints = 25;
    
    
    },
    
    endGame: function() {
        this.gameRunning = false

        this.failText.visible = true;

        //this.dancer.animations.stop(null, true);
        //this.dancer.frame = 7; //sad frame
        this.dancer.animations.play('dance10', 10, false);
        this.endSound.play();
        this.music.pause();
        this.moveCounter = 0;


        this.game.input.onDown.addOnce(this.backToMenu, this);
        //this.time.events.add(3000, this.backToMenu, this);
    
    },

    winGame: function () {
        this.gameRunning = false;

        this.winText.visible = true;


        this.dancer.animations.stop(null, true);
        this.dancer.frame = 11; //happy frame
        this.winSound.play();
        this.applauseSound.play();
        this.music.pause();
        this.moveCounter = 0;

        // Emitter
        this.manager = this.game.plugins.add(Phaser.ParticleStorm);
        var glowy = {
            image: 'colorsHD',
            frame: ['yellow', 'white'],
            lifespan: { min: 600, max: 900 },
            vx: { value: { min: 4, max: 12 }, delta: -0.1 },
            vy: { value: { min: -15.0, max: -10 }, delta: 0.5 },
            scale: { value: 1, control: [{ x: 0, y: 1 }, { x: 1, y: 0.5 }] },
            alpha: { value: 1, control: [{ x: 0, y: 1 }, { x: 0.5, y: 1 }, { x: 1, y: 0 }] },
            emit: {
                name: 'glowyChild',
                value: 1,
                control: [{ x: 0, y: 0 }, { x: 0.2, y: 0 }, { x: 1, y: 1 }]
            }
        };
        var glowyChild = {
            image: 'colorsHD',
            frame: ['red', 'green', 'blue'],
            blendMode: 'HARD_LIGHT',
            lifespan: 1000,
            vx: { min: -4, max: 4 },
            vy: { value: { min: -10, max: -6 }, delta: 0.5 },
            scale: { value: { min: 0.5, max: 1 }, control: [{ x: 0, y: 1 }, { x: 1, y: 0.5 }] },
            alpha: { value: 1, control: [{ x: 0, y: 1 }, { x: 1, y: 0 }] }
        };
        this.manager.addData('glowy', glowy);
        this.manager.addData('glowyChild', glowyChild);
        this.emitter = this.manager.createEmitter();
        this.emitter.addToWorld();
        this.emitter.emit('glowy', this.world.centerX - 200, this.world.centerY, { repeat: -1, frequency: 500 });



        
        this.game.input.onDown.addOnce(this.backToMenu, this);
        //this.time.events.add(8000, this.backToMenu, this);

    },




    
    runMissLogic: function() {
        this.failCounter += 1;
        var missText = this.game.add.bitmapText(this.world.centerX, this.world.centerY, 'carrier_command', this.getNegativePhrase(), 24);
        missText.anchor.setTo(0.5);
        missText.smoothed = false;
        this.booSound.play();
        this.spotlight.visible = false;

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
                this.applauseSound.play();
                this.explosionAnimation.visible = true;
                this.explosionAnimation.reset(arrow.x, arrow.y);
                this.explosionAnimation.play('kaboom', 30, false, true);

  //              this.spotlight.visible = true;

    
            }
            
        }
        else {
            this.fastClickCount  = 0;                
        }

        // if(this.allowExplosions) {
        //     this.explosionAnimation.visible = true;
        //     this.explosionAnimation.reset(arrow.x, arrow.y);
        //     this.explosionAnimation.play('kaboom', 30, false, true);
        // }
    
        this.successSound.play();
    
        this.currScore += this.arrowPoints;
        this.scoreText.text = 'SCORE:' + this.currScore;
        if (timeToClickArrow < this.successSpeedTime) {
            this.game.add.tween(this.scoreText).to({ fontSize: 30 }, 250).to({ fontSize: 25 }, 250).start();
        }
    
    
        arrow.visible = false;
        this.dancer.animations.play('dance' + this.game.rnd.integerInRange(1, 9), 10, true);
        if (arrow.key == 'slidearrow') {
            var slideOffset = 0;
            var rotateOffset = 0;
            if (arrow.angle == 0) {
                slideOffset = 200;
                //rotateOffset = 15
            }
            else {
                slideOffset = -200;
                //rotateOffset = -15
            }
            this.game.add.tween(this.dancer).to({ x: this.game.world.centerX + slideOffset }, 500).to({ x: this.game.world.centerX }, 500).start();
            this.game.add.tween(this.dancer).to({ angle: rotateOffset }, 500).to({ angle: 2 }, 500).to({ angle: 0 }, 500).start();
        }
        else if(arrow.key == 'diagonalarrow'){
            if(arrow.angle == -45){
                this.game.add.tween(this.dancer).to({ angle: 360 }, 250).start();
            } else {
                this.game.add.tween(this.dancer).to({ angle: -360 }, 250).start();
            }
        } else if (arrow.angle == -90) {
            this.game.add.tween(this.dancer).to({ y: this.game.world.centerY + 65 }, 150).to({ y: this.game.world.centerY + 145 }, 150).start();
        }
    
        if(this.currScore >= this.winScore) {
            this.winGame();
        }
    }

};