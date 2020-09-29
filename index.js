import tweening from './tweening/tweening.js';
import utils from './tweening/utils.js';
(function() {

        const app = new PIXI.Application({
            width: 800, height: 600, transparent: true, resolution: window.devicePixelRatio || 1,
        });
        document.getElementById('canvas-div').appendChild(app.view);
        document.getElementById('start-animation').addEventListener('click', startAction)
        document.getElementById('state').addEventListener('change', changeRadioButton)

        // create character
        const texture = PIXI.Texture.from('./bmps/character.png');
        //NB: characterWidth HAS BEEN HARD CODED BECAUSE IF ASSET ISN'T LOADED VIA A LOADER, THE WIDTH WILL BE "1" REFELCTING THE %
        let state = "single", characterWidth = 154, characters = [], counter = 0;
        setUpSingle();

        function createCharacter (obj) {
            const character = new PIXI.Sprite(texture);
            character.anchor.set(0.5);
            character.scale.set(obj.scale);
            character.x = obj.startX;
            character.y = obj.startY;
            character.props = obj;
            return character;
        }
       
        //make text field
        const basicText = new PIXI.Text();
        basicText.anchor.set(0.5);
        basicText.x = app.screen.width / 2;
        basicText.y = (app.screen.height - 100);

        app.stage.addChild(basicText);

        function setUpSingle () {
            app.stage.removeChildren();
            let obj = {
                startX: characterWidth / 2,
                startY: app.screen.height / 2,
                endX: app.screen.width - (characterWidth / 2),
                endY: app.screen.height / 2,
                duration: 2,
                scale: 1
            }
            let character = createCharacter(obj);
            characters = [character];
            app.stage.addChild(character);
        }
        function setUpMultiple () {
            characters = [];
            app.stage.removeChildren();
            for (let i = 0; i < 100; i ++ ) {
                let obj = {
                    startX: utils.randomNumberBetween(0, app.screen.width),
                    startY: utils.randomNumberBetween(0, app.screen.height),
                    endX: utils.randomNumberBetween(0, app.screen.width),
                    endY: utils.randomNumberBetween(0, app.screen.height),
                    scale: utils.randomNumberBetween(0, 1),
                    duration: utils.randomNumberBetween(.04, 2)
                }
                let character = createCharacter(obj);
                characters.push(character);
                app.stage.addChild(character);
            }
        }
        function startAction () {
            tweening.killAll();
            counter = 0;
            document.getElementById('start-animation').disabled = true;
            basicText.text = "";
            for (let i = 0; i < characters.length; i++) {
                let character = characters[i];
                 tweening.tween(character, character.props.duration, {
                x: [character.props.startX, character.props.endX], 
                y: [character.props.startY, character.props.endY]
            }, actionComplete,'bouncePast');
            }
           
        }

        function actionComplete () {
           
            if (state === 'single') {
                document.getElementById('start-animation').disabled = false;
                basicText.text = "action complete!";
            } else {
                counter ++;
                basicText.text = counter.toString();
                if (counter === 100) {
                    document.getElementById('start-animation').disabled = false;
                   
                }
            }
        }

        function changeRadioButton (e) {
            if (e.target.value === 'single') {
                state = 'single';
                setUpSingle();
            } else {
                state = 'multiple';
                setUpMultiple();
            }

        }


        // Listen for animate update
        app.ticker.add((delta) => {
            tweening.animate();
        });

})()
