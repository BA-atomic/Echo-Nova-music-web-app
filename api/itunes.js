import axios from "axios";

export default async function handler(req, res) {
  const { term = "afrobeats", limit = 4 } = req.query;

  try {
    const response = await axios.get("https://itunes.apple.com/search", {
      params: { term, media: "music", limit },
    });

    res.status(200).json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong fetching music." });
  }
}
