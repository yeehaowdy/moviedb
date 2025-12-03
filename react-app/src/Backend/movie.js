import fetch from 'node-fetch';
import { handler as metadataHandler } from '../../../tmdb-metadata.cjs';

export const handler = async (event) => {
  const type = event.queryStringParameters?.type || 'movie';
  const page = event.queryStringParameters?.page || 1;
  const genres = event.queryStringParameters?.genres || '';

  try {
    const result = await metadataHandler();
    if (result.error) throw new Error(result.error);

    const TMDB_BEARER = `Bearer ${result.apiKey}`;
    const url = `https://api.themoviedb.org/3/discover/${type}?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genres}`;
    const resp = await fetch(url, { method: 'GET', headers: { accept: 'application/json', Authorization: TMDB_BEARER } });
    const data = await resp.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
