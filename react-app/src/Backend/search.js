import fetch from 'node-fetch';
import { handler as metadataHandler } from '../../../tmdb-metadata.cjs';

export const handler = async (event) => {
  const query = event.queryStringParameters?.query || '';
  const page = event.queryStringParameters?.page || 1;

  try {
    const result = await metadataHandler();
    if (result.error) throw new Error(result.error);

    const TMDB_BEARER = `Bearer ${result.apiKey}`;
    let url;
    if (!query) {
      url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=original_title.asc&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/search/multi?language=en-US&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
    }

    const resp = await fetch(url, { method: 'GET', headers: { accept: 'application/json', Authorization: TMDB_BEARER } });
    const data = await resp.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
