// Songs

const songs = [
  {
      title: "Tiru Tiru Gananadha",
      artist: "100%Love",
      album: "My Album",
      image: "img/song1.jpg",
      audio: "songs/song1.mp3"
  },

  {
      title: "Raatan Lambiyan",
      artist: "Shershaah",
      album: "My Album",
      image: "img/song2.jpg",
      audio: "songs/song2.mp3"
  },

  {
      title: "Wanna Be Yours",
      artist: "Arctic Monkeys",
      album: "My Album",
      image: "img/song3.jpg",
      audio: "songs/song3.mp3"
  },

  {
    title: "Aakasam Lona",
    artist: "Oh Baby",
    album: "My Album",
    image: "img/song4.jpg",
    audio: "songs/song4.mp3"
}
];


// Get HTML elements

const audio = document.getElementById("audio");

const albumImage = document.getElementById("albumImage");

const songTitle = document.getElementById("songTitle");

const artistName = document.getElementById("artistName");

const albumName = document.getElementById("albumName");

const playBtn = document.getElementById("playBtn");

const previousBtn = document.getElementById("previousBtn");

const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const volumeBar = document.getElementById("volumeBar");

const muteBtn = document.getElementById("muteBtn");

const shuffleBtn = document.getElementById("shuffleBtn");

const repeatBtn = document.getElementById("repeatBtn");

const favoriteBtn = document.getElementById("favoriteBtn");

const playlistContainer =
  document.getElementById("playlistContainer");


// Current song

let songIndex = 0;

let isPlaying = false;

let isShuffle = false;

let isRepeat = false;

let isFavorite = false;


// Load song

function loadSong(index) {

  const song = songs[index];

  songTitle.textContent = song.title;

  artistName.textContent = song.artist;

  albumName.textContent = song.album;

  albumImage.src = song.image;

  audio.src = song.audio;

  updatePlaylist();

}


// Play song

function playSong() {

  audio.play();

  isPlaying = true;

  playBtn.innerHTML =
      '<i class="fa-solid fa-pause"></i>';
}


// Pause song

function pauseSong() {

  audio.pause();

  isPlaying = false;

  playBtn.innerHTML =
      '<i class="fa-solid fa-play"></i>';
}


// Play / Pause

playBtn.addEventListener("click", function () {

  if (isPlaying) {

      pauseSong();

  } else {

      playSong();

  }

});


// Previous

previousBtn.addEventListener("click", function () {

  songIndex--;

  if (songIndex < 0) {

      songIndex = songs.length - 1;

  }

  loadSong(songIndex);

  playSong();

});


// Next

nextBtn.addEventListener("click", function () {

  nextSong();

});


// Next song function

function nextSong() {

  if (isShuffle) {

      let randomIndex =
          Math.floor(Math.random() * songs.length);

      while (randomIndex === songIndex && songs.length > 1) {

          randomIndex =
              Math.floor(Math.random() * songs.length);

      }

      songIndex = randomIndex;

  } else {

      songIndex++;

      if (songIndex >= songs.length) {

          songIndex = 0;

      }

  }

  loadSong(songIndex);

  playSong();

}


// Automatically play next song

audio.addEventListener("ended", function () {

  if (isRepeat) {

      audio.currentTime = 0;

      playSong();

  } else {

      nextSong();

  }

});


// Update progress

audio.addEventListener("timeupdate", function () {

  if (audio.duration) {

      const progress =
          (audio.currentTime / audio.duration) * 100;

      progressBar.value = progress;

  }

  currentTime.textContent =
      formatTime(audio.currentTime);

});


// Show duration

audio.addEventListener("loadedmetadata", function () {

  duration.textContent =
      formatTime(audio.duration);

});


// Seek

progressBar.addEventListener("input", function () {

  if (audio.duration) {

      audio.currentTime =
          (progressBar.value / 100) * audio.duration;

  }

});


// Format time

function formatTime(time) {

  if (isNaN(time)) {

      return "0:00";

  }

  let minutes =
      Math.floor(time / 60);

  let seconds =
      Math.floor(time % 60);

  if (seconds < 10) {

      seconds = "0" + seconds;

  }

  return minutes + ":" + seconds;

}


// Volume

volumeBar.addEventListener("input", function () {

  audio.volume = volumeBar.value;

});


// Mute

muteBtn.addEventListener("click", function () {

  if (audio.muted) {

      audio.muted = false;

      muteBtn.innerHTML =
          '<i class="fa-solid fa-volume-high"></i>';

      volumeBar.value = audio.volume;

  } else {

      audio.muted = true;

      muteBtn.innerHTML =
          '<i class="fa-solid fa-volume-xmark"></i>';

  }

});


// Shuffle

shuffleBtn.addEventListener("click", function () {

  isShuffle = !isShuffle;

  shuffleBtn.classList.toggle("active");

});


// Repeat

repeatBtn.addEventListener("click", function () {

  isRepeat = !isRepeat;

  repeatBtn.classList.toggle("active");

});


// Favorite

favoriteBtn.addEventListener("click", function () {

  isFavorite = !isFavorite;

  if (isFavorite) {

      favoriteBtn.innerHTML =
          '<i class="fa-solid fa-heart"></i>';

  } else {

      favoriteBtn.innerHTML =
          '<i class="fa-regular fa-heart"></i>';

  }

});


// Create playlist

function updatePlaylist() {

  playlistContainer.innerHTML = "";

  songs.forEach(function (song, index) {

      const item =
          document.createElement("div");

      item.classList.add("playlist-item");

      if (index === songIndex) {

          item.classList.add("active-song");

      }

      item.innerHTML = `

          <img src="${song.image}" alt="Album">

          <div class="playlist-text">

              <h4>${song.title}</h4>

              <p>${song.artist}</p>

          </div>

          <i class="fa-solid fa-play"></i>

      `;

      item.addEventListener("click", function () {

          songIndex = index;

          loadSong(songIndex);

          playSong();

      });

      playlistContainer.appendChild(item);

  });

}


// Load first song

loadSong(songIndex);