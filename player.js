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
const volumeBar = document.querySelector(".volumeBar");
const volumeLevel = document.querySelector(".volumeLevel");
const songPoster = document.querySelector("#currentTrackImg");
const currentTrackTitle = document.querySelector("#currentTrackTitle");
const currentTrackArtist = document.querySelector("#currentTrackArtist");
const likeBtn = document.querySelector(".favorite");
const favoriteList = document.querySelector(".favoriteList");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const repeatBtn = document.querySelector("#repeat");
const shuffleBtn = document.querySelector("#shuffle");

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

async function loadCollections() {
  trendingCollection.innerHTML = "";
  streetCollection.innerHTML = "";
  artistsCollection.innerHTML = "";
  chillCollection.innerHTML = "";
  freshCollection.innerHTML = "";

  const collectionMap = {
    trending: trendingCollection,
    street: streetCollection,
    artists: artistsCollection,
    chill: chillCollection,
    fresh: freshCollection,
  };

  for (const category in musicSearchPool) {
    const collectionDiv = collectionMap[category];

    for (const term of musicSearchPool[category]) {
      await getMusic(term, collectionDiv, 6, 10); // fetch songs
      await delay(150); // wait 150ms before the next request
    }
  }
}

loadCollections();

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const audioPlayer = new Audio();

let activePlaylist = [];
let favoriteSongs = [];

let currentIndex = -1; // current position in playlist
let isRepeatOn = false;
let isShuffleOn = false;

function playSongByIndex(index) {
  const song = activePlaylist[index];
  if (!song) return;

  currentIndex = index;

  audioPlayer.src = song.url;
  audioPlayer.load();
  PlayTheSong();

  songPoster.src = song.cover;
  currentTrackTitle.textContent = song.title;
  currentTrackArtist.textContent = song.artist;

  currentSong = { ...song };
  progress.style.width = "0%";
  likeBtn.classList.add("activeLike");

  highlightCurrentSong();
}

function playNextSong() {
  if (activePlaylist.length === 0) return;
  if (isShuffleOn) {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * activePlaylist.length);
    } while (randomIndex === currentIndex);

    playSongByIndex(randomIndex);
    return;
  }

  if (currentIndex === -1) {
    playSongByIndex(0);
  } else if (currentIndex < activePlaylist.length - 1) {
    playSongByIndex(currentIndex + 1);
  }
}

function highlightCurrentSong() {
  // remove highlight everywhere
  document
    .querySelectorAll(".songContainer, .favDivContainer")
    .forEach((el) => el.classList.remove("currentPlaying"));

  if (!currentSong) return;

  // highlight in main sections
  document.querySelectorAll(".songContainer").forEach((el) => {
    if (el.dataset.songUrl === currentSong.url) {
      el.classList.add("currentPlaying");
    }
  });

  // highlight in favorites
  document.querySelectorAll(".favDivContainer").forEach((el) => {
    if (el.dataset.url === currentSong.url) {
      el.classList.add("currentPlaying");
    }
  });
}

function toggleRepeat() {
  isRepeatOn = !isRepeatOn;

  if (isRepeatOn) {
    isShuffleOn = false;
    shuffleBtn.classList.remove("activeControl");
  }

  repeatBtn.classList.toggle("activeControl", isRepeatOn);
}

audioPlayer.addEventListener("ended", () => {
  if (isRepeatOn) {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    return;
  }

  playNextSong();
});

function toggleShuffle() {
  isShuffleOn = !isShuffleOn;

  if (isShuffleOn) {
    isRepeatOn = false;
    repeatBtn.classList.remove("activeControl");
  }

  shuffleBtn.classList.toggle("activeControl", isShuffleOn);
}

function playPrevSong() {
  if (activePlaylist.length === 0) return;

  if (currentIndex > 0) {
    playSongByIndex(currentIndex - 1);
  } else if (isRepeatOn) {
    playSongByIndex(activePlaylist.length - 1);
  }
}

function pickRandomWord(category) {
  const word = musicSearchPool[category];
  const randomIndex = Math.floor(Math.random() * word.length);

  return word[randomIndex];
}

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

function formatTime(time) {
  if (!Number.isFinite(time) || time < 0) return `0:00`;
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);

  return secs < 10 ? `${mins}:0${secs}` : `${mins}:${secs}`;
}

function updateProgress(clientX) {
  const rect = progressBar.getBoundingClientRect();
  const percent = (clientX - rect.left) / rect.width;
  const clamped = Math.max(0, Math.min(1, percent)); //No matter what, keep the value between 0 and 1.
  if (Number.isFinite(audioPlayer.duration)) {
    audioPlayer.currentTime = clamped * audioPlayer.duration;
    progress.style.width = clamped * 100 + "%";
  }
}

function seek(seekX) {
  const rect = volumeBar.getBoundingClientRect();
  const percent = (seekX - rect.left) / rect.width;
  const clamped = Math.max(0, Math.min(1, percent)); //No matter what, keep the value between 0 and 1.

  volumeLevel.style.width = clamped * 100 + "%";
  audioPlayer.volume = clamped;
}

searchBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  dropDown.innerHTML = "";
  const searchTerm = input.value.trim();
  getMusic(searchTerm, dropDown, 8, 20);

  dropDown.classList.add("show");
  closeDropIcon.classList.add("show");
});

closeDropIcon.addEventListener("click", (e) => {
  dropDown.classList.remove("show");
  closeDropIcon.classList.remove("show");
});

document.addEventListener("click", (e) => {
  // if click is outside dropdown + search area
  if (
    !dropDown.contains(e.target) &&
    !searchBtn.contains(e.target) &&
    !input.contains(e.target)
  ) {
    dropDown.classList.remove("show");
    closeDropIcon.classList.remove("show");
  }
});

playBtn.addEventListener("click", (e) => {
  if (audioPlayer.paused) {
    audioPlayer
      .play()
      .then(() => {
        playBtn.textContent = "⏸";
      })
      .catch((error) => {
        console.log(error);
      });
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

progressBar.addEventListener("click", (e) => {
  if (isDragging) return; //Disable click while dragging
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

  updateProgress(e.clientX);
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  updateProgress(e.clientX);
});

document.addEventListener("mouseup", (e) => {
  if (!isDragging) return;

  isDragging = false;
  if (wasPlaying) {
    audioPlayer.play();
  }
});

progressBar.addEventListener(
  "touchstart",
  (e) => {
    e.preventDefault();
    if (!Number.isFinite(audioPlayer.duration)) return;
    wasPlaying = !audioPlayer.paused;
    audioPlayer.pause();
    isDragging = true;
  },
  { passive: false }
);

progressBar.addEventListener(
  "touchmove",
  (e) => {
    if (!isDragging) return;
    e.preventDefault();

    updateProgress(e.touches[0].clientX);
  },
  { passive: false }
);

progressBar.addEventListener("touchend", (e) => {
  if (!isDragging) return;

  isDragging = false;
  if (wasPlaying) {
    audioPlayer.play();
  }
});

let seekDragging = false;
volumeBar.addEventListener("click", (e) => {
  if (seekDragging) return;
  seek(e.clientX);
});

volumeBar.addEventListener("mousedown", (e) => {
  seekDragging = true;

  seek(e.clientX);
});

document.addEventListener("mousemove", (e) => {
  if (!seekDragging) return;
  seek(e.clientX);
});

document.addEventListener("mouseup", (e) => {
  seekDragging = false;
});

volumeBar.addEventListener(
  "touchstart",
  (e) => {
    if (isDragging) return;
    seekDragging = true;
    e.preventDefault();
    seek(e.touches[0].clientX);
  },
  { passive: false }
);

volumeBar.addEventListener(
  "touchmove",
  (e) => {
    if (!seekDragging) return;
    e.preventDefault();

    seek(e.touches[0].clientX);
  },
  { passive: false }
);

volumeBar.addEventListener("touchend", (e) => {
  if (!seekDragging) return;

  seekDragging = false;
});

// Handle like button click
likeBtn.addEventListener("click", (e) => {
  if (!currentSong) return;

  likeBtn.classList.toggle("activeLike");

  // Check if song is already favorited
  let isFavorited = favoriteSongs.find((song) => song.url === currentSong.url);

  if (isFavorited) {
    // Remove from favorites
    likeBtn.classList.remove("activeLike");
    document.querySelectorAll(".favDivContainer").forEach((div) => {
      if (div.dataset.url === currentSong.url) {
        div.remove();
      }
    });

    favoriteSongs = favoriteSongs.filter(
      (song) => song.url !== currentSong.url
    );
  } else {
    // Add to favorites
    favoriteSongs.push({ ...currentSong });

    // Create favorite item
    const favItem = document.createElement("div");
    favItem.classList.add("favDivContainer");

    favItem.dataset.url = currentSong.url;
    favItem.dataset.cover = currentSong.cover;
    favItem.dataset.title = currentSong.title;
    favItem.dataset.artist = currentSong.artist;

    favItem.innerHTML = `
      <img src="${currentSong.cover}" class="favDivImage"/>
      <div class="faveSongDetails">
        <p class="faveTitle">${shortenText(currentSong.title, 10)}</p>
        <p class="faveArtist">${shortenText(currentSong.artist, 10)}</p>
      </div>
    `;

    // Click to play favorite song
    favItem.addEventListener("click", (e) => {
      const songData = e.currentTarget.dataset;
      activePlaylist = [...favoriteSongs];
      const index = favoriteSongs.findIndex(
        (song) => song.url === songData.url
      );

      playSongByIndex(index);
    });

    favoriteList.appendChild(favItem);
  }

  highlightCurrentSong();
});

nextBtn.addEventListener("click", () => {
  playNextSong();
  likeBtn.classList.remove("activeLike");
});
prevBtn.addEventListener("click", () => {
  playPrevSong();
  likeBtn.classList.remove("activeLike");
});
shuffleBtn.addEventListener("click", toggleShuffle);
repeatBtn.addEventListener("click", toggleRepeat);
