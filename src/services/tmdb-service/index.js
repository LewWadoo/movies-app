export default class TmdbService {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3';

    this.api_key = '7f4ae495fb8b4511c86da94230d39db1';

    this.getResource = async (url, query) => {
      const searchUrl = `${this.baseURL}${url}`;
      const keyUrl = `api_key=7f4ae495fb8b4511c86da94230d39db1`;
      const fullURL = `${searchUrl}?query=${query}&${keyUrl}`;
      const result = await fetch(fullURL);

      if (!result.ok) {
        throw new Error(`Could not fetch ${searchUrl}, recieved ${result.status}`);
      }

      const body = await result.json();
      return body;
    };

    this.searchMovies = async (query) => {
      const movies = await this.getResource('/search/movie', query);
      return movies.results;
    };
  }
}
