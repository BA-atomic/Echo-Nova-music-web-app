async function getMusic(searchWord, divToappend, limit, songNameLimit) {

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

  if (isIOS) {
    //----------------------------------------------------------------
    //- Gemini helped with the search params connection to our backend
    //----------------------------------------------------------------
    try {
        const searchParams = new URLSearchParams({
            term: searchWord,
            media: "music",
            limit: limit
        });
        //---------------------------------------------------------------------------------
        //- Make request to our own backend server as a workaround for IOS-only CORS issues
        //---------------------------------------------------------------------------------
        const response = await fetch(`http://[your IP address goes here]:4000/get/search-list?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //-
        const data = await response.json();
        const songs = data.results;
        displaySong(songs, divToappend, songNameLimit);
    } catch (error) {
      divToappend.innerHTML = `<p class="errormessage">This feature is not available for iOS devices.</p>`;
    }
  } else {
    try {
      const response = await axios.get("https://itunes.apple.com/search?", {
        params: { term: searchWord, media: "music", limit: limit },
      });
      const songs = response.data.results;
      displaySong(songs, divToappend, songNameLimit);
    } catch (error) {
      divToappend.innerHTML = `<p class="errormessage">Something went wrong. Check internet connection and try again later.</p>`;
      divToappend.style.justifyContent = "center";
    }
  }
}

function displaySong(songs, divToappend, songNameLimit) {
  if (!songs || songs.length === 0) {
    divToappend.innerHTML = `<p class="errormessage">CONTENT NOT FOUND. PLEASE TRY AGAIN LATER.</p>`;
    return;
  }

  songs.forEach(({ collectionName, artistName, artworkUrl100, previewUrl }) => {
    const songName = shortenText(collectionName, songNameLimit);

    const imageUrl = artworkUrl100
      .replace("http://", "https://")
      .replace(/100x100bb(\.jpg)?/, "600x600bb.jpg");

    // Song card
    const innerDiv = document.createElement("div");
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
      if (!previewUrl) return;

      const divClick = e.currentTarget;

      const allSongs = divToappend.querySelectorAll(".songContainer");

      activePlaylist = Array.from(allSongs).map((song) => ({
        title: song.dataset.collectionName,
        artist: song.dataset.artistName,
        url: song.dataset.songUrl,
        cover: song.dataset.imageUrl,
      }));

      // Find index
      currentIndex = Array.from(allSongs).indexOf(divClick);

      if (likeBtn.classList.contains("activeLike")) {
        likeBtn.classList.remove("activeLike");
      }
      playSong(divClick);

      currentSong = {
        title: songName,
        artist: artistName,
        url: previewUrl,
        cover: imageUrl,
      };

      highlightCurrentSong();

      progress.style.width = `0%`;
      songPoster.src = imageUrl;
      currentTrackTitle.textContent = songName;
      currentTrackArtist.textContent = shortenText(artistName, 10);
    });

    divToappend.appendChild(innerDiv);
  });
}

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
