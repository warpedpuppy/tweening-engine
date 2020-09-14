import tweening from './tweening/tweening.js';

(function() {

        const app = new PIXI.Application({
            width: 800, height: 600, transparent: true, resolution: window.devicePixelRatio || 1,
        });
        document.getElementById('canvas-div').appendChild(app.view);
        document.getElementById('start-animation').addEventListener('click', startAction)


        // create character
        const texture = PIXI.Texture.from('./bmps/character.png');
        const character = new PIXI.Sprite(texture);
        character.anchor.set(0.5);
        character.width = 154; //NB: THIS HAS BEEN HARD CODED BECAUSE IF ASSET ISN'T LOADED VIA A LOADER, THE WIDTH WILL BE "1" REFELCTING THE %
        character.startX = character.width / 2;
        character.endX = app.screen.width - character.startX;
        character.x = character.startX;
        character.y = app.screen.height / 2;
        
        app.stage.addChild(character);
       


       
        

        //make text field
        const basicText = new PIXI.Text();
        basicText.anchor.set(0.5);
        basicText.x = app.screen.width / 2;
        basicText.y = (app.screen.height - 100);

        app.stage.addChild(basicText);

        function startAction () {
            basicText.text = "";
            tweening.tween(character, 2, {x: [character.startX, character.endX]}, actionComplete,'easeOutBounce');
        }

        function actionComplete () {
            basicText.text = "action complete!";
        }


        // Listen for animate update
        app.ticker.add((delta) => {
            tweening.animate();
        });

})()
