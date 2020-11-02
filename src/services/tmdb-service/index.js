export default class TmdbService {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3';

    this.api_key = '7f4ae495fb8b4511c86da94230d39db1';

    this.getResource = async (url, query, language, allowAdult) => {
      const searchUrl = `${this.baseURL}${url}`;
      const apiKey = `7f4ae495fb8b4511c86da94230d39db1`;
      const fullURL = `${searchUrl}?query=${query}&api_key=${apiKey}&include_adult=${allowAdult}&language=${language}`;

      let result;
      try {
        result = await fetch(fullURL);
        if (!result.ok) {
          throw new Error(`Could not fetch ${searchUrl}, recieved ${result.status}`);
        }
      } catch (error) {
        throw new Error(error);
      }

      let body;
      try {
        body = await result.json();
      } catch (error) {
        body = error;
      }
      return body;
    };

    this.searchMovies = async (query, language, allowAdult) => {
      let movies;
      try {
        // eslint-disable-next-line no-debugger
        // debugger;
        movies = await this.getResource('/search/movie', query, language, allowAdult);
      } catch (error) {
        // eslint-disable-next-line no-debugger
        // debugger;
      }
      return movies.results;
    };
  }
}
