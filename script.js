// State Variables
let isPlaying = false;
let playheadPos = 0;
let animationId = null;

// DOM Elements
const playhead = document.getElementById('playhead');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const addTrackBtn = document.getElementById('add-track-btn');
const trackHeadersContainer = document.getElementById('track-headers');
const timeline = document.getElementById('timeline');

// 1. Function to create a new track row
function addTrack() {
    const trackCount = document.querySelectorAll('.track-header').length + 1;

    // Create Left Header
    const header = document.createElement('div');
    header.className = 'track-header';
    header.innerHTML = `Track ${trackCount}`;
    trackHeadersContainer.appendChild(header);

    // Create Right Lane
    const lane = document.createElement('div');
    lane.className = 'track-lane';
    timeline.appendChild(lane);
}

// 2. Playhead Animation Loop
function animate() {
    if (isPlaying) {
        playheadPos += 2; // Movement speed
        playhead.style.left = playheadPos + 'px';
        
        // Loop timeline (Optional)
        if (playheadPos > timeline.offsetWidth) {
            playheadPos = 0;
        }
        
        animationId = requestAnimationFrame(animate);
    }
}

// 3. Event Listeners
playBtn.onclick = () => {
    isPlaying = !isPlaying;
    playBtn.innerText = isPlaying ? "⏸" : "▶";
    if (isPlaying) {
        animate();
    } else {
        cancelAnimationFrame(animationId);
    }
};

stopBtn.onclick = () => {
    isPlaying = false;
    cancelAnimationFrame(animationId);
    playheadPos = 0;
    playhead.style.left = '0px';
    playBtn.innerText = "▶";
};

addTrackBtn.onclick = addTrack;

// Start with 3 tracks by default
for(let i=0; i<3; i++) addTrack();
