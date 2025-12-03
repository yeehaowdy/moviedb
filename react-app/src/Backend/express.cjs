const express = require("express");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const cors = require("cors");
const metadata = require("../../tmdb-metadata.cjs");

const app = express();
app.use(cors());

let TMDB_BEARER = null;

async function initTmdb() {
  const result = await metadata.handler();
  if (result.error) {
    console.error("TMDB metadata error:", result.error);
    return;
  }
  TMDB_BEARER = `Bearer ${result.apiKey}`;
  console.log("✅ TMDB Bearer betöltve:", TMDB_BEARER.substring(0, 20) + "...");
}

app.use(async (req, res, next) => {
  if (!TMDB_BEARER) {
    await initTmdb();
  }
  next();
});

function getTmdbOptions() {
  return {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: TMDB_BEARER
    }
  };
}

app.get("/genres", async (req, res) => {
  const type = req.query.type || "movie";
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en`, getTmdbOptions());
    const data = await response.json();
    res.json(data.genres);
  } catch (err) {
    console.error("Genre fetch error:", err);
    res.status(500).json({ error: "Genre fetch failed" });
  }
});

app.get("/movies", async (req, res) => {
  const type = req.query.type || "movie";
  const page = req.query.page || 1;
  const genres = req.query.genres || "";

  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genres}`;

  try {
    const response = await fetch(url, getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Movie fetch error:", err);
    res.status(500).json({ error: "Movie fetch failed" });
  }
});

app.get("/search", async (req, res) => {
  const query = req.query.query || "";
  const page = req.query.page || 1;

  try {
    const url = `https://api.themoviedb.org/3/search/movie?language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
    const response = await fetch(url, getTmdbOptions());
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Search fetch error:", err);
    res.status(500).json({ error: "Search fetch failed" });
  }
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Backend fut: http://localhost:${PORT}`));
