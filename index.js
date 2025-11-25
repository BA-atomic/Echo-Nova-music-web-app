const songPreviews = document.querySelector(".songsPreview");
const songNames = document.querySelectorAll(".songName");
const form = document.querySelector(".newsletterForm");
const message = document.querySelector(".message");
const messageContainer = document.querySelector(".messageContainer");
const input = document.querySelector(".newsletterInput");


getMusic("afrobeat", songPreviews, 4);

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
