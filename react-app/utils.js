const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:3333";

export const getData = async ({ queryKey }) => {
  console.log('getData queryKey', queryKey);
  const [, type = "movie", page = 1, selectedGenres = []] = queryKey;

  const genresParam = (Array.isArray(selectedGenres) && selectedGenres.length > 0)
    ? selectedGenres.join(",")
    : "";

  const url = `${BACKEND}/movies?type=${type}&page=${page}&genres=${genresParam}`;
  console.log("getData url", url);

  const resp = await fetch(url);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Backend /movies error: ${resp.status} ${text}`);
  }
  return await resp.json();
};

export const getGenres = async ({ queryKey }) => {
  console.log("getGenres queryKey", queryKey);
  const [, type = "movie"] = queryKey;

  const url = `${BACKEND}/genres?type=${type}`;
  console.log("getGenres url", url);

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
