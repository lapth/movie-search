export function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const SEARCH_DELAY = 500; //ms

export const OMDB_API_URL = `https://www.omdbapi.com/?apikey=${global.AppConfig.OMDB_API_KEY}&`;
