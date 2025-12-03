const BACKEND = import.meta.env.VITE_BACKEND_URL || "";

export const getData = async ({ queryKey }) => {
  const [, type = "movie", page = 1, selectedGenres = []] = queryKey;
  const genresParam = Array.isArray(selectedGenres) && selectedGenres.length ? selectedGenres.join(",") : "";
  const url = `${BACKEND}/.netlify/functions/api/movies?type=${type}&page=${page}&genres=${genresParam}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(await resp.text());
  return await resp.json();
};

export const getGenres = async ({ queryKey }) => {
  const [, type = "movie"] = queryKey;
  const url = `${BACKEND}/.netlify/functions/api/genres?type=${type}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(await resp.text());
  const genres = await resp.json();
  return { genres };
};

export const searchData = async (query = "", page = 1) => {
  const url = `${BACKEND}/.netlify/functions/api/search?query=${encodeURIComponent(query)}&page=${page}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(await resp.text());
  return await resp.json();
};

export const img_300 = "https://image.tmdb.org/t/p/w300";
export const img_500 = "https://image.tmdb.org/t/p/w500";
