// --- STATE & AUDIO CONFIG ---
let isPlaying = false;
let playheadPos = 0;
let animationId = null;
let audioCtx = null;

const playhead = document.getElementById('playhead');
const playBtn = document.getElementById('play-btn');
const stopBtn = document.getElementById('stop-btn');
const addTrackBtn = document.getElementById('add-track-btn');
const trackHeadersContainer = document.getElementById('track-headers');
const timeline = document.getElementById('timeline');

// Initialize Audio Context (Crucial for iOS/iPadOS)
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

// Logic Synth Engine: Plays a note
function playLogicSynth(freq = 440) {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle'; // Soft, Logic-style synth
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.6);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
}

// --- UI FUNCTIONS ---

function addTrack() {
    const trackCount = document.querySelectorAll('.track-header').length + 1;

    // Create the left-side header
    const header = document.createElement('div');
    header.className = 'track-header';
    header.innerHTML = `Inst ${trackCount}`;
    trackHeadersContainer.appendChild(header);

    // Create the right-side playable lane
    const lane = document.createElement('div');
    lane.className = 'track-lane';
    
    // Add interaction: Click to play a sound
    lane.addEventListener('mousedown', () => {
        const randomFreq = 200 + (Math.random() * 600); // Varied notes
        playLogicSynth(randomFreq);
    });

    timeline.appendChild(lane);
}

function animate() {
    if (isPlaying) {
        playheadPos += 2.5; // Controls the "speed" of the song
        playhead.style.left = playheadPos + 'px';
        
        // Loop back to start if it goes too far
        if (playheadPos > timeline.offsetWidth) {
            playheadPos = 0;
        }
        animationId = requestAnimationFrame(animate);
    }
}

// --- EVENT LISTENERS ---

playBtn.onclick = () => {
    initAudio(); // Ensures audio wakes up on user tap
    isPlaying = !isPlaying;
    playBtn.innerText = isPlaying ? "⏸ Pause" : "▶ Play";
    if (isPlaying) animate();
    else cancelAnimationFrame(animationId);
};

stopBtn.onclick = () => {
    isPlaying = false;
    cancelAnimationFrame(animationId);
    playheadPos = 0;
    playhead.style.left = '0px';
    playBtn.innerText = "▶ Play";
};

addTrackBtn.onclick = addTrack;

// Initialize with 4 default tracks
for(let i=0; i<4; i++) addTrack();
