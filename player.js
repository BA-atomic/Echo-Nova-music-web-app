const trendingCollection = document.querySelector(".trendingCollection");
const streetCollection = document.querySelector(".streetCollection");
const artistsCollection = document.querySelector(".artistsCollection");

const musicSearchPool = {
  trending: ["nigeria top music", "new release afrobeat"],

  afrobeats: [
    "afrobeats",
    "afrobeats new",
    "afrobeats nigeria",
    "afrobeats hits",
    "lagos afrobeats",
  ],

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

  fresh: [
    "new music nigeria",
    "latest naija",
    "fresh naija music",
    "new afrobeats 2025",
    "naija debut",
  ],
};

function pickRandomWord(category) {
  const word = musicSearchPool[category];
  const randomIndex = Math.floor(Math.random() * word.length);
  console.log(word[randomIndex]);

  return word[randomIndex];
}

getMusic(pickRandomWord("trending"), trendingCollection, 5);
getMusic(pickRandomWord("street"), streetCollection, 5);
getMusic(pickRandomWord("artists"), artistsCollection, 5);
