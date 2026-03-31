let isPlaying = false;
let playheadPos = 0;
const playhead = document.getElementById('playhead');
const playBtn = document.getElementById('play-btn');

function animate() {
    if (isPlaying) {
        playheadPos += 2; // Speed of the playhead
        playhead.style.left = playheadPos + 'px';
        
        // Loop back if it hits the end of the screen
        if (playheadPos > window.innerWidth) playheadPos = 0;
        
        requestAnimationFrame(animate);
    }
}

playBtn.onclick = () => {
    isPlaying = !isPlaying;
    playBtn.innerText = isPlaying ? "⏸" : "▶";
    if (isPlaying) animate();
};

document.getElementById('stop-btn').onclick = () => {
    isPlaying = false;
    playheadPos = 0;
    playhead.style.left = '0px';
    playBtn.innerText = "▶";
};
