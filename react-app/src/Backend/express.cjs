const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3333;

const TMDB_BEARER = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMWJlMTg3OGI4MDg3OTUwMDgxNThkYzFiNzYxMThmYiIsIm5iZiI6MTc2NDA2Njg0OC41NjQ5OTk4LCJzdWIiOiI2OTI1ODYyMGVjN2IyMTAwNmVkOWMzYWEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wbWS-dgSjlECkEiaPmhbnrChoP8xEs_9GCAf4rMa8Eo";

const TMDB_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TMDB_BEARER,
  },
};

app.get("/genres", async (req, res) => {
  const type = req.query.type === "tv" ? "tv" : "movie";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
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
  const type = req.query.type === "tv" ? "tv" : "movie";
  const page = req.query.page || 1;
  const genres = req.query.genres || "";

  const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genres}`;

  try {
    const response = await fetch(url, TMDB_OPTIONS);
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error("Movie fetch error:", err);
    return res.status(500).json({ error: "Movie fetch failed" });
  }
});

app.listen(PORT, () => {
  console.log("Backend fut: http://localhost:" + PORT);
});
