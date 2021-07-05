const musicContainer = document.querySelector('.music-container');

const playBTN = document.querySelector('#play');
const prevBTN = document.querySelector('#prev');
const nextBTN = document.querySelector('#next');

const audio = document.querySelector('#audio');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Music Titles
const songs = ['colours', 'after hours'];

// To keep track of songs
let songIndex = 0;

// Initially load song into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.png`;
}

// Play song
function playSong() {
    musicContainer.classList.add('play');
    playBTN.querySelector('i.fas').classList.remove('fa-play');
    playBTN.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBTN.querySelector('i.fas').classList.remove('fa-pause');
    playBTN.querySelector('i.fas').classList.add('fa-play');
    audio.pause();
}

// Previous song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update song progress
function updateProgress(event) {
    const { duration, currentTime } = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Sets progress
function setProgress(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Event listeners
// Play button
playBTN.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

// Change songs
prevBTN.addEventListener('click', prevSong);
nextBTN.addEventListener('click', nextSong);

audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

audio.addEventListener('ended', nextSong);
