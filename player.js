const trendingCollection = document.querySelector(".trendingCollection");
const streetCollection = document.querySelector(".streetCollection");
const artistsCollection = document.querySelector(".artistsCollection");
const chillCollection = document.querySelector(".chillCollection");
const freshCollection = document.querySelector(".freshCollection");
const input = document.querySelector(".inputMusic");
const searchBtn = document.querySelector(".searchBtn");
const dropDown = document.querySelector(".dropDown");
const songDiv = document.querySelectorAll(".songDiv");
const dropDownDiv = document.querySelector(".dropDownDiv");
const closeDropIcon = document.querySelector(".closeDropIcon");
const playBtn = document.querySelector(".playPause");
const currentSongTime = document.querySelector("#currentTime");
const songDuration = document.querySelector("#duration");
const progressBar = document.querySelector(".progressBar");
const progress = document.querySelector(".progress");

const audioPlayer = new Audio();

const musicSearchPool = {
  trending: ["nigeria top music", "new release afrobeat", "trending"],

  street: [
    "street pop nigeria",
    "afrostreet",
    "naija amapiano",
    "nigerian street music",
    "ibile music",
  ],

  artists: [
    "rema",
    "burna boy",
    "wizkid",
    "davido",
    "asake",
    "tems",
    "shallipopi",
    "ayra starr",
    "odumodublvck",
    "portable",
  ],

  chill: ["naija chill", "relax naija", "soft afrobeats"],

  fresh: ["fresh 2025 afrobeats", "new afrobeats 2025"],
};

function pickRandomWord(category) {
  const word = musicSearchPool[category];
  const randomIndex = Math.floor(Math.random() * word.length);

  return word[randomIndex];
}

getMusic(pickRandomWord("trending"), trendingCollection, songDiv, 6, 10);
getMusic(pickRandomWord("street"), streetCollection, songDiv, 6, 10);
getMusic(pickRandomWord("artists"), artistsCollection, songDiv, 6, 10);
getMusic(pickRandomWord("chill"), chillCollection, songDiv, 6, 10);
getMusic(pickRandomWord("fresh"), freshCollection, songDiv, 6, 10);

searchBtn.addEventListener("click", (e) => {
  dropDown.innerHTML = "";
  const searchTerm = input.value.trim();
  getMusic(searchTerm, dropDown, dropDownDiv, 8, 20);

  dropDown.classList.add("show");
  closeDropIcon.classList.add("show");
});

closeDropIcon.addEventListener("click", (e) => {
  dropDown.classList.remove("show");
  closeDropIcon.classList.remove("show");
});

function playSong(parentElement) {
  audioPlayer.src = parentElement.dataset.songUrl;
  audioPlayer.load();
  PlayTheSong();
}

function PlayTheSong() {
  audioPlayer.play();
  playBtn.innerHTML = "";
  playBtn.innerHTML = `
  <i class="fa-solid fa-pause"></i>
  `;
}

playBtn.addEventListener("click", (e) => {
  if (audioPlayer.paused) {
    audioPlayer
      .play()
      .then(() => {
        playBtn.textContent = "⏸";
      })
      .catch((error) => {});
  } else {
    audioPlayer.pause();
    playBtn.innerHTML = "";
    playBtn.innerHTML = `
  <i class="fas fa-play"></i>
  `;
  }
});

audioPlayer.addEventListener("timeupdate", (e) => {
  currentSongTime.textContent = formatTime(audioPlayer.currentTime);
  songDuration.textContent = formatTime(
    audioPlayer.duration - audioPlayer.currentTime
  );

  if (!isDragging && audioPlayer.duration) {
    songLength = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${songLength}%`;
  }
});

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) return `0:00`;
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);

  return secs < 10 ? `${mins}:0${secs}` : `${mins}:${secs}`;
}

progressBar.addEventListener("click", (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  if (Number.isFinite(audioPlayer.duration)) {
    audioPlayer.currentTime = percent * audioPlayer.duration;
  }
});

let isDragging = false;
let wasPlaying = false;
progressBar.addEventListener("mousedown", (e) => {
  if (!Number.isFinite(audioPlayer.duration)) return;
  wasPlaying = !audioPlayer.paused;
  audioPlayer.pause();
  isDragging = true;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const rect = progressBar.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  const clamped = Math.max(0, Math.min(1, percent)); //No matter what, keep the value between 0 and 1.
  if (Number.isFinite(audioPlayer.duration)) {
    audioPlayer.currentTime = clamped * audioPlayer.duration;
    progress.style.width = clamped * 100 + "%";
  }
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;

  isDragging = false;
  if (wasPlaying) {
    audioPlayer.play();
  }
});

// How to pause audio while dragging and resume on release

// How to add a draggable thumb/handle

// How to support touch drag cleanly

// How to prevent conflicts with timeupdate
