// Function to load a partial via AJAX into the #content container
function loadPage(section) {
    console.log(section);
    fetch('./pages/' + section + '.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content').innerHTML = '<p>Error loading page.</p>';
        });
}

// Handle the route change by extracting the section from the hash,
// updating the active nav link, and loading the partial.
function handleRoute() {
    const section = window.location.hash.slice(1) || 'projects';
    // Update active nav links:
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector(`.nav-links a[data-section="${section}"]`)?.classList.add('active');
    console.log(section);
    loadPage(section);
}

// Update click handlers to change the URL hash.
document.querySelectorAll('.nav-links a, .site-logo').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        let section = link.getAttribute('data-section');
        window.location.hash = section; // This triggers the hashchange event.
    });
});

// Listen for hash changes (when browser back/forward is pressed) and on page load.
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
    if (!window.location.hash) {
        window.location.hash = 'projects'; // Default to projects
    }
    handleRoute();

    // Set the current year in the copyright
    const currentYear = new Date().getFullYear();
    document.getElementById('copyright').textContent =
        `Copyright (c) ${currentYear} Grady O'Connell`;
});
// Update eye and PFP movement
document.addEventListener('mousemove', (e) => {
    // Handle PFP container tilt
    const pfpContainer = document.querySelector('.pfp-container');
    if (pfpContainer) {
        const rect = pfpContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        const maxRotation = 15; // Maximum rotation in degrees
        const rotateX = (mouseY / (window.innerHeight / 2)) * -maxRotation;
        const rotateY = (mouseX / (window.innerWidth / 2)) * maxRotation;
        
        pfpContainer.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
        `;
    }

    // Handle eye movement
    const eyes = document.querySelectorAll('.eye-left, .eye-right');
    eyes.forEach(eye => {
        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(2, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 100);
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        eye.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Reset PFP transform when mouse leaves window
document.addEventListener('mouseleave', () => {
    const pfpContainer = document.querySelector('.pfp-container');
    if (pfpContainer) {
        pfpContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }
});

// Add random blinking
function triggerBlink() {
    const eyes = document.querySelectorAll('.eye-left, .eye-right');
    eyes.forEach(eye => {
        eye.classList.add('blinking');
        setTimeout(() => {
            eye.classList.remove('blinking');
        }, 200);
    });

    // Schedule next blink
    const nextBlink = Math.random() * (5000 - 2000) + 2000; // Random time between 2-5 seconds
    setTimeout(triggerBlink, nextBlink);
}

// Start blinking after a short delay
setTimeout(triggerBlink, 2000);
