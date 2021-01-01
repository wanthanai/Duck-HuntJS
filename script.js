(() => {

    //! Random min, max
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //! Create Duck
    const createDuck = () => {
        return [...Array(6)].map(() => {
            return {
                x: random(0, window.innerWidth),
                y: window.innerHeight,
                speedX: random(-50, 50),
                speedY: random(5, 10)
            };
        });
    };
    
    //! Setup Duck Element
    const setupDuckElement = (duck) => {
        const duckElemWrapper = document.createElement('div');
        duckElemWrapper.className = 'duck_wrapper';
        duckElemWrapper.style.left = `${duck.x}px`;
        duckElemWrapper.style.top = `${duck.y}px`;
        document.body.appendChild(duckElemWrapper);

        const duckElem = document.createElement('div');
        duckElem.className = 'duck';
        duckElem.style.backgroundImage = 'url(./img/left-1.png)';
        duckElemWrapper.appendChild(duckElem);
        
        return { duck, duckElem, duckElemWrapper };
    }

    //! get duck Background Image
    const getDuckBackgroundImage = (duck, duckElem) => {
        const direction = duck.speedX > 0 ? 'right' : 'left';
        return duckElem.style.backgroundImage.indexOf('1') !== -1 ? 
        `url(./img/${direction}-2.png)` : 
        `url(./img/${direction}-1.png)`
    }

    //! Move Duck
    const moveDuck = (duck, duckElem, duckElemWrapper) => {
        const { left, top } = duckElem.getBoundingClientRect(); 
        const outOfBoundX = duck.x < 0 || duck.x > window.innerWidth;
        const outOfBoundY = duck.y < 0 || duck.y > window.innerHeight;

        if(outOfBoundX) {
            duck.speedX *= -1
        }
        if(outOfBoundY) {
            duck.speedY *= -1
        }

        duck.x = left + duck.speedX;
        duck.y = top - duck.speedY;
        duckElemWrapper.style.left = `${duck.x}px`;
        duckElemWrapper.style.top = `${duck.y}px`;

        duckElem.style.backgroundImage = getDuckBackgroundImage(duck, duckElem);
    }

    //! Shoot Duck
    const shootDuck = (evt) => {
        soundShotDuck(media = 'play');

        const duckElem = evt.target;
        const duckElemWrapper = evt.path[1];
        duckElem.style.backgroundImage = 'url(./img/shot.png)'
        duckElemWrapper.style.transition = '2s';
        duckElemWrapper.style.top = `${window.innerHeight}px`;        
        // console.log(evt)
        // console.log(duckElemWrapper)

        clearInterval(duckElem.interval);

        setTimeout(() => {
            document.body.removeChild(duckElemWrapper);
            const duckWrapper = document.querySelector('.duck_wrapper');

            // if there's no duck
            if(!duckWrapper) {
                // remove background temporary for mute sound shot background 
                document.querySelector('.background_temp').style.display = 'none';


                // query
                const winningElem = document.querySelector('.winning');
                const buttonWrapper = document.querySelector('.button_wrapper');
                const button = document.querySelector('button');

                // winning
                winningElem.style.opacity = '1';
                winningElem.style.letterSpacing = 'normal';
                winningElem.style.transform = 'scale(1)';

                // button wrawpper
                buttonWrapper.style.display = 'inline';

                // button
                setTimeout(() => {
                    button.style.opacity = '1';
                }, 2000)

                // Restart 
                button.addEventListener('click', () => {
                    const SoundOhyeah = new Audio('/sound/ohYeah.mp3');
                    SoundOhyeah.play();
                    setTimeout(() => {
                        location.reload();
                    }, 2000)
                })

            }
            
        }, 2000)
    }
    
    //! sound shot background
    const soundShotBackground = (media) => {

        document.querySelector('.background_temp').addEventListener('click', () => {
            if(media === 'play') {
                var soundShot = new Audio('/sound/gunSound.mp3');
                soundShot.play();
            }
            if(media === 'mute') {
                var soundShot = new Audio('/sound/gunSound.mp3');
                soundShot.pause();
            }    
        })
    }   

    //! sound shot duck
    const soundShotDuck = () => {
        var soundShot = new Audio('/sound/gunSound.mp3');

        if(media === 'play') {
            soundShot.play();
        }
        if(media === 'mute') {
            soundShot.pause();
        }    
    }

    //! Run
    const run = () => {
        const ducks = createDuck();
        const duckElems = ducks.map(setupDuckElement);

        soundShotBackground(media = 'play');

        duckElems.forEach(({duck, duckElem, duckElemWrapper}) => {
            duckElem.interval = setInterval(() => moveDuck(duck, duckElem, duckElemWrapper), 50)
            duckElemWrapper.addEventListener('click', shootDuck);
        })
    }
    run();

    

})();