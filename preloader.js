BasicGame.Preloader = function (game) {

	this.preloadBar = null;

	this.ready = false;

};


BasicGame.Preloader.prototype = {


	preload: function () {

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
        
        this.preloaderStage = this.add.image(this.game.world.centerX, this.game.world.centerY, 'preloaderStage');
        this.preloaderStage.anchor.setTo(0.5);
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5);


		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, swap them for your own.
        this.game.load.image('stage0', 'assets/pics/stage.png');
        this.game.load.image('stage1', 'assets/pics/discopixel.png');
        this.game.load.image('stage2', 'assets/pics/latin.png');
        this.game.load.image('stage3', 'assets/pics/space.png');
        this.game.load.audio('song1', ['assets/audio/frenchydafty.mp3']);
        this.game.load.audio('song2', ['assets/audio/latinflavour.mp3']);
        this.game.load.audio('song3', ['assets/audio/space.mp3']);
    
        this.game.load.audio('start', ['assets/audio/button_start.wav']);
        this.game.load.audio('success', ['assets/audio/button_correct.wav']);
        this.game.load.audio('miss', ['assets/audio/button_fail.wav']);
        this.game.load.audio('end', ['assets/audio/dramatic.wav']);
    
        this.game.load.spritesheet('dancer1', 'assets/sprites/dancer1.png', 64, 64);
        this.game.load.spritesheet('dancer2', 'assets/sprites/dancer2.png', 64, 64);
        this.game.load.spritesheet('dancer3', 'assets/sprites/dancer3.png', 64, 64);
    
        this.game.load.image('portrait1', 'assets/sprites/biopic1.png');
        this.game.load.image('portrait2', 'assets/sprites/biopic2.png');
        this.game.load.image('portrait3', 'assets/sprites/biopic3.png');
        this.game.load.image('startBtn', 'assets/sprites/start.png');
    
    
        this.game.load.image('arrow', 'assets/sprites/arrow.png');
        this.game.load.image('slidearrow', 'assets/sprites/slidearrow.png');
        this.game.load.image('diagonalarrow', 'assets/sprites/diagonalarrow.png');
        this.game.load.spritesheet('kaboom', 'assets/sprites/explosion.png', 64, 64, 23);
        this.game.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');


	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
        this.state.start('Game');

	}

	

};