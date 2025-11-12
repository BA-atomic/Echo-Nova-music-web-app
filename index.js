const songPreviews = document.querySelector(".songsPreview");
const songNames = document.querySelectorAll(".songName");
const form = document.querySelector(".newsletterForm");
const successMessage = document.querySelector(".successMessage");
const errorMessage = document.querySelector(".errorMessage");
const messageContainer = document.querySelector(".messageContainer");
const input = document.querySelector(".newsletterInput");

async function getMusic() {
  try {
    const response = await axios.get("https://itunes.apple.com/search?", {
      params: { term: "afrobeats", media: "music", limit: 4 },
    });
    const songs = response.data.results;
    displaySong(songs);
  } catch (error) {
    songPreviews.innerHTML = `<p class="errormessage">Something went wrong. Check internet connection and try again later.</p>`;
    songPreviews.style.justifyContent = "center";
    console.error(error);
  }
}
getMusic();

function displaySong(songs) {
  if (songs.length === 0) {
    songPreviews.innerHTML = `<p>CONTENT NOT FOUND PLEASE TRY AGAIN LATER</p>`;
    return;
  }
  songs.forEach(({ collectionName, artistName, artworkUrl100 }) => {
    const songName = shortenText(collectionName, 30);
    const imageUrl = artworkUrl100;
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

function shortenText(word, maxLength) {
  return word.length > maxLength ? word.slice(0, maxLength) + "..." : word;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = input.value.trim();
  if (isValidEmail(email)) {
    showMessage(successMessage);
  } else {
    showMessage(errorMessage);
  }
});

function showMessage(elementToShow) {
  successMessage.classList.add("hide");
  errorMessage.classList.add("hide");
  elementToShow.classList.remove("hide");
  setTimeout(() => {
    elementToShow.classList.add("hide");
  }, 2000);
}

function isValidEmail(email) {
  email = email.trim();
  if (
    !email.includes("@") ||
    !email.includes(".") ||
    email.includes("..") ||
    email.includes(" ")
  )
    return false;

  const emailparts = email.split("@");
  const [local, domain] = emailparts;
  if (!local || !domain) return false;

  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;

  if (!domain.includes(".")) return false;

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (tld.length < 2) return false;

  return true;
}

console.log(isValidEmail("atomic.dev@example.com"));
console.log(isValidEmail("atomic.dev@domain"));
console.log(isValidEmail("atomic@.com"));
console.log(isValidEmail("@example.com"));
console.log(isValidEmail(" atomic@example.com "));
