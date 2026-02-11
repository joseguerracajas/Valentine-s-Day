const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const questionCard = document.getElementById('question-card');
const questionSection = document.getElementById('question-section');
const invitationSection = document.getElementById('invitation-section');
const bgMusic = document.getElementById('bg-music');
const heartsContainer = document.getElementById('hearts-bg');




// Function to move the 'No' button
function moveNoButton() {
    // We need to keep it within the viewport, but specifically avoid the cursor
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width - 20;
    const maxY = window.innerHeight - btnRect.height - 20;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noBtn.style.position = 'fixed'; // Use fixed to stay relative to viewport
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
}

// Event listeners for 'No' button
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('click', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Event listener for 'Yes' button
yesBtn.addEventListener('click', () => {
    // Show invitation section
    invitationSection.classList.remove('hidden');

    // Scroll to invitation section smoothly
    invitationSection.scrollIntoView({ behavior: 'smooth' });

    // Play music
    bgMusic.play().catch(error => {
        console.log("Audio play failed", error);
    });

    // Confetti effect
    triggerConfetti();

    // Change background slightly to celebrate
    document.body.style.background = "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)";
});

// Confetti function
function triggerConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Create floating hearts dynamically
function createHearts() {
    const heartCount = 20;
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2-5s
        heart.style.opacity = Math.random();
        heart.style.fontSize = Math.random() * 20 + 10 + 'px'; // Random size

        // Randomly choose a color
        const colors = ['#ff4d6d', '#ff8fa3', '#ffccd5', '#fff0f3'];
        heart.style.background = colors[Math.floor(Math.random() * colors.length)];

        heartsContainer.appendChild(heart);

        // Remove and recreate after animation to keep DOM clean-ish (optional, CSS infinite handles loop well enough usually, but for random positions we might want JS)
        // For simplicity, we stick to CSS infinite loop, but let's randomize delay
        heart.style.animationDelay = Math.random() * 5 + 's';
    }
}

// Initialize
createHearts();
