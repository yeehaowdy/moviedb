const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";

export const getData = async ({ queryKey }) => {
  const [mode = "discover", type = "movie", page = 1, selectedGenres = [], query = ""] = queryKey;

  const genresParam = (Array.isArray(selectedGenres) && selectedGenres.length > 0)
    ? selectedGenres.join(",")
    : "";

  let url = `${BACKEND}/movies?type=${type}&page=${page}&genres=${genresParam}`;

  if (mode === "search" && query) {
    url += `&query=${encodeURIComponent(query)}`;
  }

  console.log("getData url:", url);

  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Backend /movies error: ${resp.status} ${text}`);
  }
  return await resp.json();
};


export const getGenres = async ({ queryKey }) => {
  const [, type = "movie"] = queryKey;

  const url = `${BACKEND}/genres?type=${type}`;
  console.log("getGenres url:", url);

  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Backend /genres error: ${resp.status} ${text}`);
  }

  const genres = await resp.json();
  return { genres };
};

export const img_300 = "https://image.tmdb.org/t/p/w300";
export const img_500 = "https://image.tmdb.org/t/p/w500";
