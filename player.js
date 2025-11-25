const musicCollections = document.querySelector(".musicCollections");

async function getMusic(term = "trending", limit = 10) {
  try {
    const response = await fetch(`/api/itunes?term=${term}&limit=${limit}`);
    const songs = await response.json();
    displaySongs(songs);
  } catch (error) {
    musicCollections.innerHTML = `<p class="errormessage">Something went wrong.</p>`;
    console.error(error);
  }
}

function displaySongs(songs) {
  musicCollections.innerHTML = "";

  songs.forEach(({ collectionName, artistName, artworkUrl100 }) => {
    const imageUrl = artworkUrl100
      .replace("100x100bb.jpg", "600x600bb.jpg")
      .replace(".webp", ".jpg");
    const songDiv = document.createElement("div");
    songDiv.classList.add("songContainer");
    songDiv.innerHTML = `
      <img src="${imageUrl}" class="imagePoster" loading="lazy" alt="music cover art">
      <h4 class="songName">${collectionName}</h4>
      <p class="artistName">${artistName}</p>
    `;
    musicCollections.appendChild(songDiv);
  });
}

getMusic();
