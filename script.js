const songList = [
  {
    name: "On & On",
    artist: "Cartoon, Daniel Levi, Jéja",
    src: "./assets/on-and-on.mp3",
    cover: "./assets/on-and-on.jpg",
  },
  {
    name: "Paralyzed",
    artist: "DM Galaxy, Tyler Fiore, Disfigure",
    src: "assets/paralyzed.mp3",
    cover: "assets/paralyzed.jpg",
  },
  {
    name: "Heroes Tonight",
    artist: "Janji, Johnning",
    src: "assets/heroes-tonight.mp3",
    cover: "assets/Heroes-Tonight.jpg",
  },
  {
    name: "Heroes Tonight",
    artist: "Janji, Johnning",
    src: "assets/heroes-tonight.mp3",
    cover: "assets/Heroes-Tonight.jpg",
  },
];

const artistName = document.querySelector(".artist-name");
const musicName = document.querySelector(".song-name");
const fillBar = document.querySelector(".fill-bar");
const time = document.querySelector(".time");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const prog = document.querySelector(".progress-bar");
const volume = document.querySelector(".volume");

let song = new Audio();
let currentSong = 0;
let playing = false;

document.addEventListener("DOMContentLoaded", () => {
  loadSong(currentSong);
  song.addEventListener("timeupdate", updateProgress);
  song.addEventListener("ended", nextSong);
  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);
  playBtn.addEventListener("click", togglePlayPause);
  prog.addEventListener("click", seek);
  volume.addEventListener("click", changeVolume);
});

function loadSong(index) {
  const { name, artist, src, cover: thumb } = songList[index];
  artistName.innerText = artist;
  musicName.innerText = name;
  song.src = src;
  cover.style.backgroundImage = `url(${thumb})`;
}

function updateProgress() {
  if (song.duration) {
    const pos = (song.currentTime / song.duration) * 100;
    fillBar.style.width = `${pos}%`;

    const duration = formatTime(song.duration);
    const currentTime = formatTime(song.currentTime);
    time.innerText = `${currentTime} - ${duration}`;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

function togglePlayPause() {
  if (playing) {
    song.pause();
  } else {
    song.play();
  }
  playing = !playing;
  playBtn.classList.toggle("fa-pause", playing);
  playBtn.classList.toggle("fa-play", !playing);
  cover.classList.toggle("active", playing);
}
function nextSong() {
  currentSong = (currentSong + 1) % songList.length;
  playMusic();
}

function prevSong() {
  currentSong = (currentSong - 1 + songList.length) % songList.length;
  playMusic();
}

function playMusic() {
  loadSong(currentSong);
  song.play();
  playing = true;
  playBtn.classList.add("fa-pause");
  playBtn.classList.remove("fa-play");
  cover.classList.add("active");
}

function seek(e) {
  const pos = (e.offsetX / this.clientWidth) * song.duration;
  song.currentTime = pos;
}

function changeVolume(e) {
  const pos = (e.offsetX / this.clientWidth) * 100;
  song.volume = pos / 100;
  volume.style.width = `${pos}%`;
}
