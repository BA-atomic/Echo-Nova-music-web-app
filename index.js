const songPreviews = document.querySelector(".songsPreview");

async function getMusic() {
  try {
    const response = await axios.get("https://itunes.apple.com/search?", {
      params: { term: "afrobeats", media: "music", limit: 4 },
    });
    const songs = response.data.results;
    displaySong(songs);
  } catch (error) {
      songPreviews.innerHTML = `<p>Something went wrong. Try again later.</p>`;
    console.error(error);
  }
}
getMusic();

function displaySong(songs) {
  if (songs.length === 0)
    return (songDiv.innerHTML = `<p>CONTENT NOT FOUND PLEASE TRY AGAIN LATER</p>`);
  songs.forEach(({ collectionName, artistName, artworkUrl100 }) => {
    const songName = collectionName;
    imageUrl = artworkUrl100;
    const songDiv = document.createElement("div");
    songDiv.classList.add("songContainer");
    songDiv.innerHTML = `
        <img src="${imageUrl}" class="imagePoster" alt="music cover art">
        <h4 class="songName">${songName}</h4>
        <p class="artistName">${artistName}</p>
        `;
    songPreviews.appendChild(songDiv);
  });
}
