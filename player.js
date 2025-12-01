const trendingCollection = document.querySelector(".trendingCollection");
const streetCollection = document.querySelector(".streetCollection");
const artistsCollection = document.querySelector(".artistsCollection");
const chillCollection = document.querySelector(".chillCollection");
const freshCollection = document.querySelector(".freshCollection");
const input = document.querySelector(".inputMusic");
const searchBtn = document.querySelector(".searchBtn");
const dropDown = document.querySelector(".dropDown");
const songDiv = document.querySelector(".songDiv");
const dropDownDiv = document.querySelector(".dropDownDiv");
const closeDropIcon = document.querySelector(".closeDropIcon");

const musicSearchPool = {
  trending: ["nigeria top music", "new release afrobeat"],

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

function pickRandomWord(category) {
  const word = musicSearchPool[category];
  const randomIndex = Math.floor(Math.random() * word.length);

  return word[randomIndex];
}

getMusic(pickRandomWord("trending"), trendingCollection, songDiv, 6, 10);
getMusic(pickRandomWord("street"), streetCollection, songDiv, 6, 10);
getMusic(pickRandomWord("artists"), artistsCollection, songDiv, 6, 10);
getMusic(pickRandomWord("chill"), chillCollection, songDiv, 6, 10);
getMusic(pickRandomWord("fresh"), freshCollection, songDiv, 6, 10);

searchBtn.addEventListener("click", (e) => {
  dropDown.innerHTML = "";
  const searchTerm = input.value.trim();
  getMusic(searchTerm, dropDown, dropDownDiv, 8, 20);

  dropDown.classList.add("show");
  closeDropIcon.classList.add("show");

  setTimeout(() => {
    dropDown.classList.remove("hide");
  }, 250);
});
