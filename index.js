const songPreviews = document.querySelector(".songsPreview");
const songNames = document.querySelectorAll(".songName");
const form = document.querySelector(".newsletterForm");
const message = document.querySelector(".message");
const messageContainer = document.querySelector(".messageContainer");
const input = document.querySelector(".newsletterInput");
const mediaQuery = window.matchMedia("(max-width: 800px)");

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
    songPreviews.innerHTML = `<p>CONTENT NOT FOUND. PLEASE TRY AGAIN LATER.</p>`;
    return;
  }

  songs.forEach(({ collectionName, artistName, artworkUrl100 }) => {
    const songName = shortenText(collectionName, 20);

    // Ensure HTTPS
    const rawImage = artworkUrl100.replace(/^http:\/\//, "https://");

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
        class="imagePoster lazyFade" 
        loading="lazy"
        alt="music cover art"
        onerror="this.onerror=null; this.src='fallback.jpg'"
      >
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
  input.value = "";

  if (email === "") {
    displayMessage("Please enter a valid email address.");
    removeClass(message, "errorMessage", "successMessage");
  } else if (isValidEmail(email)) {
    displayMessage("Sucessfully submitted");
    removeClass(message, "successMessage", "errorMessage");
  } else {
    displayMessage("Please enter a valid email address.");
    removeClass(message, "errorMessage", "successMessage");
  }
});

mediaQuery.addEventListener("change", (e) => {
  if (e.matches) {
    console.log("Media query (min-width: 800px) is now active.");
  }
});

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

function isValidEmail(email) {
  email = email.trim();
  if (
    !email ||
    !email.includes("@") ||
    !email.includes(".") ||
    email.includes("..") ||
    email.includes(" ")
  )
    return false;

  const emailparts = email.split("@");
  if (emailparts.length > 2) return false;
  const [local, domain] = emailparts;
  if (!local || !domain) return false;

  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;

  if (!domain.includes(".")) return false;

  const domainParts = domain.split(".");
  const tld = domainParts[domainParts.length - 1];
  if (!tld || tld.length < 2) return false;

  return true;
}

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

reveals.forEach((el) => {
  observer.observe(el);
});
