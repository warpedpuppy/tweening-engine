import tweening from './tweening/tweening.js';

(function() {

        const app = new PIXI.Application({
            width: 800, height: 600, backgroundColor: 0x1099bb, resolution: window.devicePixelRatio || 1,
        });
        document.body.appendChild(app.view);

        const texture = PIXI.Texture.from('./bmps/character.png');
        const character = new PIXI.Sprite(texture);
        character.anchor.set(0.5);
        character.x = 100;
        character.y = 100;
        app.stage.addChild(character);
        character.width = 154; //NB: THIS HAS BEEN HARD CODED BECAUSE IF ASSET ISN'T LOADED VIA A LOADER, THE WIDTH WILL BE "1" REFELCTING THE %
        let startX = character.width / 2;
        let endX = app.screen.width - startX;
        tweening.tween(character, 2, {x: [startX, endX]}, undefined,'easeOutBounce');


        // Listen for animate update
        app.ticker.add((delta) => {
            tweening.animate();
        });

})()
