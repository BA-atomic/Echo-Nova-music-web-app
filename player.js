const trendingCollection = document.querySelector(".trendingCollection");
const streetCollection = document.querySelector(".streetCollection");
const artistsCollection = document.querySelector(".artistsCollection");
const chillCollection = document.querySelector(".chillCollection");
const freshCollection = document.querySelector(".freshCollection");

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
  console.log(word[randomIndex]);

  return word[randomIndex];
}

getMusic(pickRandomWord("trending"), trendingCollection, 6);
getMusic(pickRandomWord("street"), streetCollection, 6);
getMusic(pickRandomWord("artists"), artistsCollection, 6);
getMusic(pickRandomWord("chill"), chillCollection, 6);
getMusic(pickRandomWord("fresh"), freshCollection, 6);
