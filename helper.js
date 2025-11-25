async function getMusic(searchWord, divToappend, limit) {
  try {
    const response = await axios.get("https://itunes.apple.com/search?", {
      params: { term: searchWord, media: "music", limit: limit },
    });
    const songs = response.data.results;
    displaySong(songs, divToappend);
  } catch (error) {
    divToappend.innerHTML = `<p class="errormessage">Something went wrong. Check internet connection and try again later.</p>`;
      divToappend.style.justifyContent = "center";
  }
}

function displaySong(songs, divToappend) {
  if (songs.length === 0) {
    divToappend.innerHTML = `<p>CONTENT NOT FOUND. PLEASE TRY AGAIN LATER.</p>`;
    return;
  }

  songs.forEach(({ collectionName, artistName, artworkUrl100 }) => {
    const songName = shortenText(collectionName, 20);

    // Safari-safe CORS proxy
    let imageUrl = artworkUrl100.replace("http://", "https://");

    // Safari fix: force high-res version
    imageUrl = imageUrl.replace("100x100bb.jpg", "600x600bb.jpg");

    // avoid Safari WebP bug
    imageUrl = imageUrl.replace(".webp", ".jpg");

    // cache bust
    imageUrl += `?v=${Date.now()}`;

    // Song card
    const songDiv = document.createElement("div");
    songDiv.classList.add("songContainer");

    songDiv.innerHTML = `
      <img 
        src="${imageUrl}" 
        class="imagePoster" 
        loading="lazy"
        alt="music cover art"
      >
      <h4 class="songName">${songName}</h4>
      <p class="artistName">${artistName}</p>
    `;

    divToappend.appendChild(songDiv);
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
