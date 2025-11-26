const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_BEARER}`,
  },
};

app.get("/genres", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      TMDB_OPTIONS
    );
    const data = await response.json();

    return res.json(data.genres); 
  } catch (err) {
    console.error("Genre fetch error:", err);
    return res.status(500).json({ error: "Genre fetch failed" });
  }
});


app.get("/movies", async (req, res) => {
  const genreIds = req.query.genres || ""; 
  const page = req.query.page || 1;

  try {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreIds}`;

    const response = await fetch(url, TMDB_OPTIONS);
    const data = await response.json();

    return res.json(data);
  } catch (err) {
    console.error("Movie fetch error:", err);
    return res.status(500).json({ error: "Movie fetch failed" });
  }
});

port = 3333

app.listen(port, () => {
  console.log("Backend fut: http://localhost:3333");
});
