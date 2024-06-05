document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const fireflies = [];
    const documentHeight = document.documentElement.scrollHeight;

    const backgroundMusic = document.getElementById('backgroundMusic');
    backgroundMusic.volume = 0.5;

    // Create 100 fireflies
    for (let i = 0; i < 100; i++) {
        const firefly = document.createElement('div');
        firefly.classList.add('firefly');
        firefly.style.top = `${Math.random() * documentHeight}px`;
        firefly.style.left = `${Math.random() * window.innerWidth}px`;
        firefly.style.opacity = 0;
        fireflies.push(firefly);
        container.appendChild(firefly);
    }

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const scrollPercentage = (scrollPosition / (documentHeight - windowHeight)) * 100;

        if (scrollPercentage >= 20) {
            showFirefliesSequentially(fireflies);
        }
    });

    document.querySelector('.menu-button-0').onclick = () => {
        console.log('Menu 1 clicked');
        displayNewScreen('menu1.png', 'video.mp4', false);
    };

    document.querySelector('.menu-button-1').onclick = () => {
        console.log('Menu 2 clicked');
        displayImageScreen('menu2.png', false);
    };

    document.querySelector('.menu-button-2').onclick = () => {
        console.log('Menu 3 clicked');
        displayImageScreen('menu3.png', false);
    };

    document.querySelector('.menu-button-3').onclick = () => {
        console.log('Menu 4 clicked');
        displayImageScreen('menu4.png', false);
    };

    document.querySelector('.menu-button-4').onclick = () => {
        console.log('Menu 5 clicked');
        displayImageScreen('menu5.png', true); // Set isFromMenu5 flag
    };

    document.querySelector('.menu-button-5').onclick = () => {
        console.log('Menu 6 clicked');
        displayImageScreen('menu6.png', false);
    };

    document.querySelector('.menu-button-5').style.display = 'none';

    if (localStorage.getItem('fromMenu5') === 'true') { // Check for fromMenu5 flag
        console.log('Returning from menu 5, scrolling to top');
        localStorage.removeItem('fromMenu5');
        window.scrollTo(0, 0); // Scroll to top
        showMenuButtons();
    } else {
        console.log('Not returning from menu 5');
    }
});

function showFirefliesSequentially(fireflies) {
    console.log('Showing fireflies sequentially');
    fireflies.forEach((firefly, index) => {
        setTimeout(() => {
            firefly.style.opacity = 1;
        }, index * 100);
    });
}

function formCircleAndLine() {
    const fireflies = document.querySelectorAll('.firefly');
    const centerX = window.innerWidth / 2;
    const centerY = document.documentElement.scrollHeight - window.innerHeight / 2;
    const mainButton = document.getElementById('mainButton');

    mainButton.style.display = 'none';

    fireflies.forEach(firefly => {
        firefly.style.top = `${centerY}px`;
        firefly.style.left = `${centerX}px`;
    });

    setTimeout(() => {
        fireflies.forEach((firefly, index) => {
            if (index === 0) {
                firefly.classList.add('large-firefly');
            } else {
                firefly.style.opacity = 0;
            }
        });
    }, 2000);

    setTimeout(() => {
        const fireflyPositions = [];
        fireflies.forEach((firefly, index) => {
            if (index < 5) {
                firefly.classList.remove('large-firefly');
                firefly.classList.add('medium-firefly');
                firefly.style.opacity = 1;
                const top = `${centerY + 300}px`;
                const left = `${centerX - 550 + (index * 300)}px`;
                firefly.style.top = top;
                firefly.style.left = left;
                fireflyPositions.push({ top, left });
            }
        });

        setTimeout(() => {
            const largeFirefly = document.querySelector('.large-firefly');
            if (largeFirefly) {
                largeFirefly.style.opacity = 0;
                setTimeout(() => {
                    largeFirefly.remove();
                }, 1000);
            }
        }, 1000);

        setTimeout(() => {
            fireflyPositions.forEach((pos, index) => {
                const menuButton = document.createElement('div');
                menuButton.classList.add('menu-button');
                menuButton.classList.add(`menu-button-${index}`);
                const menuTop = `${centerY - 200}px`;
                const menuLeft = `${centerX - 600 + (index * 250)}px`;
                menuButton.style.top = menuTop;
                menuButton.style.left = menuLeft;

                const firefly = fireflies[index];
                firefly.style.position = 'relative';
                firefly.style.top = 'auto';
                firefly.style.left = 'auto';
                firefly.style.transform = 'none';
                firefly.style.marginTop = '0';
                firefly.style.marginBottom = '20px';
                firefly.style.width = '50px';
                firefly.style.height = '50px';
                firefly.style.backgroundColor = 'yellow';
                firefly.style.boxShadow = '0 0 20px yellow';
                firefly.style.borderRadius = '50%';
                menuButton.appendChild(firefly);
                container.appendChild(menuButton);

                if (index === 0) {
                    menuButton.onclick = () => {
                        displayNewScreen('menu1.png', 'video.mp4', false);
                    };
                } else if (index === 1) {
                    menuButton.onclick = () => {
                        displayImageScreen('menu2.png', false);
                    };
                } else if (index === 2) {
                    menuButton.onclick = () => {
                        displayImageScreen('menu3.png', false);
                    };
                } else if (index === 3) {
                    menuButton.onclick = () => {
                        displayImageScreen('menu4.png', false);
                    };
                } else if (index === 4) {
                    menuButton.onclick = () => {
                        displayImageScreen('menu5.png', true); // Set isFromMenu5 flag
                    };
                } else if (index == 5) {
                    menuButton.onclick = () => {
                        displayImageScreen('menu6.png', false);
                    };
                } else {
                    menuButton.onclick = () => alert(`Menu ${index + 1} clicked`);
                }

                setTimeout(() => {
                    menuButton.style.opacity = 1;
                }, 100);
            });

            setTimeout(() => {
                const imgElement = document.getElementById('MoDomDom');
                imgElement.style.display = 'block';
            }, 500);

        }, 2000);
    }, 4000);
}

function displayNewScreen(backgroundImage, videoSrc, isFromMenu5) { // Change isFromMenu4 to isFromMenu5
    console.log(`Displaying new screen: ${backgroundImage}, isFromMenu5: ${isFromMenu5}`);
    const imgElement = document.getElementById('MoDomDom');
    imgElement.style.display = 'none';

    const newScreen = document.createElement('div');
    newScreen.style.position = 'fixed';
    newScreen.style.top = '0';
    newScreen.style.left = '0';
    newScreen.style.width = '100%';
    newScreen.style.height = '100%';
    newScreen.style.backgroundImage = `url("${backgroundImage}")`;
    newScreen.style.backgroundSize = 'cover';
    newScreen.style.zIndex = '999';
    newScreen.style.overflow = 'auto';
    document.body.appendChild(newScreen);

    const menuImage = document.createElement('img');
    menuImage.src = backgroundImage;
    menuImage.style.position = 'absolute';
    menuImage.style.top = '0';
    menuImage.style.left = '50%';
    menuImage.style.transform = 'translateX(-50%)';
    menuImage.style.width = '100%';
    menuImage.style.height = 'auto';
    menuImage.style.display = 'block';
    newScreen.appendChild(menuImage);

    const videoElement = document.createElement('video');
    videoElement.src = videoSrc;
    videoElement.controls = true;
    videoElement.style.position = 'absolute';
    videoElement.style.top = '690%';
    videoElement.style.left = '50%';
    videoElement.style.transform = 'translate(-50%, -50%)';
    videoElement.style.width = '80%';
    videoElement.style.height = 'auto';
    newScreen.appendChild(videoElement);

    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Menu';
    backButton.style.position = 'fixed';
    backButton.style.bottom = '20px';
    backButton.style.left = '50%';
    backButton.style.transform = 'translateX(-50%)';
    backButton.onclick = () => {
        if (isFromMenu5) { // Change from isFromMenu4 to isFromMenu5
            localStorage.setItem('fromMenu5', 'true'); // Set fromMenu5 flag
            console.log('Setting fromMenu5 to true');
        }
        document.body.removeChild(newScreen);
        imgElement.style.display = 'block';
        showMenuButtons();
    };
    newScreen.appendChild(backButton);
}

function displayImageScreen(imageSrc, isFromMenu5) { // Change isFromMenu4 to isFromMenu5
    console.log(`Displaying image screen: ${imageSrc}, isFromMenu5: ${isFromMenu5}`);
    const imgElement = document.getElementById('MoDomDom');
    imgElement.style.display = 'none';

    const newScreen = document.createElement('div');
    newScreen.style.position = 'fixed';
    newScreen.style.top = '0';
    newScreen.style.left = '0';
    newScreen.style.width = '100%';
    newScreen.style.height = '100%';
    newScreen.style.backgroundImage = `url("${imageSrc}")`;
    newScreen.style.backgroundSize = 'cover';
    newScreen.style.zIndex = '999';
    newScreen.style.overflow = 'auto';
    document.body.appendChild(newScreen);

    const menuImage = document.createElement('img');
    menuImage.src = imageSrc;
    menuImage.style.position = 'absolute';
    menuImage.style.top = '0';
    menuImage.style.left = '50%';
    menuImage.style.transform = 'translateX(-50%)';
    menuImage.style.width = '100%';
    menuImage.style.height = 'auto';
    menuImage.style.display = 'block';
    newScreen.appendChild(menuImage);

    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Menu';
    backButton.style.position = 'fixed';
    backButton.style.bottom = '20px';
    backButton.style.left = '50%';
    backButton.style.transform = 'translateX(-50%)';
    backButton.onclick = () => {
        if (isFromMenu5) { // Change from isFromMenu4 to isFromMenu5
            localStorage.setItem('fromMenu5', 'true'); // Set fromMenu5 flag
            console.log('Setting fromMenu5 to true');
        }
        document.body.removeChild(newScreen);
        imgElement.style.display = 'block';
        showMenuButtons();
    };
    newScreen.appendChild(backButton);
}

function showMenuButtons() {
    console.log('Showing menu buttons');
    const fromMenu5 = localStorage.getItem('fromMenu5'); // Check fromMenu5 flag
    console.log(`fromMenu5 flag is: ${fromMenu5}`);
    localStorage.removeItem('fromMenu5'); // Remove fromMenu5 flag

    const menuButton5 = document.querySelector('.menu-button-5');
    if (menuButton5) {
        menuButton5.style.display = 'flex';
        menuButton5.style.opacity = 1;
    }

    const menuButtons = document.querySelectorAll('.menu-button');
    menuButtons.forEach(button => {
        button.style.display = 'flex';
    });

    const container = document.getElementById('container');
    container.style.justifyContent = 'center';
    container.style.flexWrap = 'nowrap';
    container.style.gap = '20px';

    if (fromMenu5 === 'true') { // Check fromMenu5 flag
        console.log('Scrolling to top as returning from menu 5 in showMenuButtons');
        window.scrollTo(0, 0); // Ensure scrolling to the top
    }
}
