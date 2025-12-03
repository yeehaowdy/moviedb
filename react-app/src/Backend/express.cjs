const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
const path = require("path");

// TMDB metadata import
const metadata = require(path.resolve(__dirname, "../../tmdb-metadata.cjs"));

const app = express();
app.use(cors());

// Bearer token inicializálása
let TMDB_BEARER = null;

async function initTmdb() {
  try {
    const result = await metadata.handler();
    if (result.error) {
      console.error("TMDB metadata error:", result.error);
      return;
    }
    TMDB_BEARER = `Bearer ${result.apiKey}`;
    console.log("✅ TMDB Bearer betöltve:", TMDB_BEARER.substring(0, 20) + "...");
  } catch (err) {
    console.error("TMDB init error:", err);
  }
}

// Backend indulásakor lekérjük a TMDB tokent
initTmdb();

// Segédfüggvény a TMDB fetch hívásokhoz
function getTmdbOptions() {
  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_BEARER,
    },
  };
}

// Műfajok lekérése
app.get("/genres", async (req, res) => {
  if (!TMDB_BEARER) return res.status(500).json({ error: "TMDB Bearer not loaded" });

  const type = req.query.type || "movie";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
      getTmdbOptions()
    );
    const data = await response.json();
    res.json(data.genres);
  } catch (err) {
    console.error("Genre fetch error:", err);
    res.status(500).json({ error: "Genre fetch failed" });
  }
});

// Filmek / sorozatok lekérése (discover + search)
app.get("/movies", async (req, res) => {
  if (!TMDB_BEARER) return res.status(500).json({ error: "TMDB Bearer not loaded" });

  const type = req.query.type || "movie"; // movie / tv
  const page = req.query.page || 1;
  const genres = req.query.genres || "";
  const query = req.query.query || "";

  let url;

  if (query) {
    // Keresés endpoint
    url = `https://api.themoviedb.org/3/search/${type}?query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`;
  } else {
    // Discover endpoint
    url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genres}`;
  }

  try {
    const response = await fetch(url, getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Movie fetch error:", err);
    res.status(500).json({ error: "Movie fetch failed" });
  }
});

const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Backend fut: http://localhost:${PORT}`);
});
