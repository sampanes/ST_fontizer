// index.js
const DELAY = 0.05;

const glitchTexts = document.querySelectorAll('.glitch-text');
const originalTexts = Array.from(glitchTexts).map(element => element.dataset.text);

// Initially show glitch text elements and set their inner HTML
glitchTexts.forEach((glitchText, index) => {
    glitchText.classList.add('visible');
    glitchText.innerHTML = originalTexts[index];
});

function applyGlitchEffect() {
    return new Promise((resolve) => {
        glitchTexts.forEach((glitchText, index) => {
            const glitchedText = originalTexts[index]
                .split('')
                .map((char, i) => `<span class="glitch-char" style="animation-delay: ${i * DELAY}s">${char}</span>`)
                .join('');

            glitchText.innerHTML = glitchedText;
        });

        // Find the last glitch-char element and listen for the animation end event
        const lastCharLastText = document.querySelector('.glitch-char:last-child');
        if (lastCharLastText) {
            lastCharLastText.addEventListener('animationend', () => {
                console.log('Glitch animation complete.');
                // Resolve the promise after a brief delay
                setTimeout(() => {
                    resolve();
                }, 500); // Adjust the delay as needed
            });
        } else {
            console.error('Error: Unable to find the last glitch-char element.');
            resolve(); // Resolve the promise even if there's an error
        }
    });
}

// Function to start the background animation and redirect
function startBackgroundAnimation() {
    console.log('Starting background animation...');
    const backgroundAnimation = document.querySelector('.background-animation');

    // Listen for the animation end event
    backgroundAnimation.addEventListener('animationend', () => {
        console.log('Background animation complete.');
        // Redirect to main.html after the animation is complete
        redirectToMain();
    });

    // Add the class to start the fade-in animation
    backgroundAnimation.classList.add('fade-in');
}


// Function to redirect to main.html
function redirectToMain() {
    window.location.href = 'main.html';
}

// Apply the glitch effect after a delay of 3000 milliseconds (3 seconds)
setTimeout(() => {
    console.log('Starting glitch effect...');
    applyGlitchEffect().then(startBackgroundAnimation);
}, 3000);
