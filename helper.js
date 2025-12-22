async function getMusic(
  searchWord,
  divToappend,
  innerDiv,
  limit,
  songNameLimit
) {
  try {
    const response = await axios.get("https://itunes.apple.com/search?", {
      params: { term: searchWord, media: "music", limit: limit },
    });
    const songs = response.data.results;
    displaySong(songs, divToappend, innerDiv, songNameLimit);
  } catch (error) {
    divToappend.innerHTML = `<p class="errormessage">Something went wrong. Check internet connection and try again later.</p>`;
    divToappend.style.justifyContent = "center";
  }
}

function displaySong(songs, divToappend, innerDiv, songNameLimit) {
  if (songs.length === 0) {
    divToappend.innerHTML = `<p class="errormessage>CONTENT NOT FOUND. PLEASE TRY AGAIN LATER.</p>`;
    return;
  }

  songs.forEach(({ collectionName, artistName, artworkUrl100, previewUrl }) => {
    const songName = shortenText(collectionName, songNameLimit);

    // Safari-safe CORS proxy
    let imageUrl = artworkUrl100.replace("http://", "https://");

    // Safari fix: force high-res version
    imageUrl = imageUrl.replace("100x100bb.jpg", "600x600bb.jpg");

    // avoid Safari WebP bug
    imageUrl = imageUrl.replace(".webp", ".jpg");

    // cache bust
    imageUrl += `?v=${Date.now()}`;

    // Song card
    innerDiv = document.createElement("div");
    innerDiv.classList.add("songContainer");

    innerDiv.dataset.collectionName = songName;
    innerDiv.dataset.artistName = artistName;
    innerDiv.dataset.imageUrl = imageUrl;
    innerDiv.dataset.songUrl = previewUrl;

    innerDiv.innerHTML = `
      <img 
        src="${imageUrl}" 
        class="imagePoster" 
        loading="lazy"
        alt="music cover art"
      >
      <div class="songDetails">
        <h4 class="songName">${songName}</h4>
      <p class="artistName">${shortenText(artistName, 7)}</p>
      </div>
    `;

    innerDiv.addEventListener("click", (e) => {
      const divClick = e.currentTarget;
      if (likeBtn.classList.contains("activeLike")) {
        likeBtn.classList.remove("activeLike");
      }
      playSong(divClick);

      favoritePlayList = {
        title: songName,
        artist: artistName,
        url: previewUrl,
        cover: imageUrl,
      };

      progress.style.width = `0%`;
      songPoster.src = imageUrl;
      currentTrackTitle.textContent = songName;
      currentTrackArtist.textContent = artistName;
    });

    divToappend.appendChild(innerDiv);
  });
}

let favoritePlayList = [];
likeBtn.addEventListener("click", (e) => {
  if (!favoritePlayList.url) return;
  likeBtn.classList.toggle("activeLike");

  favDiv = document.createElement("div");
  favDiv.classList.add("favDivContainer");

  favDiv.dataset.url = favoritePlayList.url;
  favDiv.dataset.cover = favoritePlayList.cover;
  favDiv.dataset.title = favoritePlayList.title;
  favDiv.dataset.artist = favoritePlayList.artist;

  favDiv.innerHTML = `
  <img src="${favoritePlayList.cover}" class="favDivImage"/>
<div class="faveSongDetails">
<p class="faveTitle">${favoritePlayList.title}</p>
<p class="faveArtist">${favoritePlayList.artist}</p>
</div>
  `;

  favDiv.addEventListener("click", (e) => {
    const divClick = e.currentTarget.dataset;
    audioPlayer.src = divClick.url;
    audioPlayer.load();
    PlayTheSong();

    songPoster.src = divClick.cover;
    currentTrackTitle.textContent = divClick.title;
    currentTrackArtist.textContent = divClick.artist;
  });

  favoriteList.appendChild(favDiv);
});

function shortenText(word, maxLength) {
  return word.length > maxLength ? word.slice(0, maxLength) + "..." : word;
}

function removeClass(element, classToAdd, classToRemove) {
  element.classList.add(classToAdd);
  element.classList.remove(classToRemove);
}

function displayMessage(text) {
  message.textContent = text;
  message.classList.remove("showMessage");
  message.classList.add("showMessage");
  setTimeout(() => {
    message.classList.remove("showMessage");
  }, 3000);
}
