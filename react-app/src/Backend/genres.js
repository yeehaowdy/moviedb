import fetch from 'node-fetch';
import { handler as metadataHandler } from '../../../tmdb-metadata.cjs';

export const handler = async (event) => {
  const type = event.queryStringParameters?.type || 'movie';

  try {
    const result = await metadataHandler();
    if (result.error) throw new Error(result.error);

    const TMDB_BEARER = `Bearer ${result.apiKey}`;
    const resp = await fetch(
      `https://api.themoviedb.org/3/genre/${type}/list?language=en`,
      { method: 'GET', headers: { accept: 'application/json', Authorization: TMDB_BEARER } }
    );
    const data = await resp.json();
    return { statusCode: 200, body: JSON.stringify(data.genres) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
