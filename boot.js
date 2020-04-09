var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        this.input.maxPointers = 3;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceLandscape = true;
        this.stage.backgroundColor = 0x000000;
        if (!this.game.device.desktop) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
           // this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
            document.body.style.backgroundColor = '#000000';
        }
    

    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloaderBar', 'assets/sprites/loading.png');
        this.load.image('preloaderStage', 'assets/pics/preloader.png');

    },

    create: function () {

        //  By this point the preloader assets have loaded to the cache, we've set the game settings
        //  So now let's start the real preloader going
        this.state.start('Preloader');

    }

};