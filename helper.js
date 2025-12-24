// async function getMusic(
//   searchWord,
//   divToappend,
//   innerDiv,
//   limit,
//   songNameLimit
// ) {
//   try {
//     const response = await axios.get("https://itunes.apple.com/search?", {
//       params: { term: searchWord, media: "music", limit: limit },
//     });
//     const songs = response.data.results;
//     displaySong(songs, divToappend, innerDiv, songNameLimit);
//   } catch (error) {
//     divToappend.innerHTML = `<p class="errormessage">Something went wrong. Check internet connection and try again later.</p>`;
//     divToappend.style.justifyContent = "center";
//   }
// }

// function displaySong(songs, divToappend, innerDiv, songNameLimit) {
//   if (songs.length === 0) {
//     divToappend.innerHTML = `<p class="errormessage>CONTENT NOT FOUND. PLEASE TRY AGAIN LATER.</p>`;
//     return;
//   }

//   songs.forEach(({ collectionName, artistName, artworkUrl100, previewUrl }) => {
//     const songName = shortenText(collectionName, songNameLimit);

//     // Safari-safe CORS proxy
//     let imageUrl = artworkUrl100.replace("http://", "https://");

//     // Safari fix: force high-res version
//     imageUrl = imageUrl.replace("100x100bb.jpg", "600x600bb.jpg");

//     // avoid Safari WebP bug
//     imageUrl = imageUrl.replace(".webp", ".jpg");

//     // cache bust
//     imageUrl += `?v=${Date.now()}`;

//     // Song card
//     innerDiv = document.createElement("div");
//     innerDiv.classList.add("songContainer");

//     innerDiv.dataset.collectionName = songName;
//     innerDiv.dataset.artistName = artistName;
//     innerDiv.dataset.imageUrl = imageUrl;
//     innerDiv.dataset.songUrl = previewUrl;

//     innerDiv.innerHTML = `
//       <img
//         src="${imageUrl}"
//         class="imagePoster"
//         loading="lazy"
//         alt="music cover art"
//       >
//       <div class="songDetails">
//         <h4 class="songName">${songName}</h4>
//       <p class="artistName">${shortenText(artistName, 7)}</p>
//       </div>
//     `;

//     innerDiv.addEventListener("click", (e) => {
//       const divClick = e.currentTarget;
//       if (likeBtn.classList.contains("activeLike")) {
//         likeBtn.classList.remove("activeLike");
//       }
//       playSong(divClick);

//       currentSong = {
//         title: songName,
//         artist: artistName,
//         url: previewUrl,
//         cover: imageUrl,
//       };

//       progress.style.width = `0%`;
//       songPoster.src = imageUrl;
//       currentTrackTitle.textContent = songName;
//       currentTrackArtist.textContent = artistName;
//     });

//     divToappend.appendChild(innerDiv);
//   });
// }

// function shortenText(word, maxLength) {
//   return word.length > maxLength ? word.slice(0, maxLength) + "..." : word;
// }

// function removeClass(element, classToAdd, classToRemove) {
//   element.classList.add(classToAdd);
//   element.classList.remove(classToRemove);
// }

// function displayMessage(text) {
//   message.textContent = text;
//   message.classList.remove("showMessage");
//   message.classList.add("showMessage");
//   setTimeout(() => {
//     message.classList.remove("showMessage");
//   }, 3000);
// }

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

      currentSong = {
        title: songName,
        artist: artistName,
        url: previewUrl,
        cover: imageUrl,
      };

      currentIndex = -1; // the song playing is not from favorites

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
