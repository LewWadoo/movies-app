export default class TmdbService {
  constructor() {
    this.baseURL = 'https://api.themoviedb.org/3';

    this.apiKey = '7f4ae495fb8b4511c86da94230d39db1';

    this.getResource = async (url) => {
      let result;
      try {
        result = await fetch(url);
        if (!result.ok) {
          throw new Error(`Could not fetch ${url}, recieved ${result.status}`);
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

    this.searchMovies = async (query, page, language, allowAdult) => {
      const searchUrl = `${this.baseURL}${'/search/movie'}`;
      const fullUrl = `${searchUrl}?query=${query}&api_key=${this.apiKey}&page=${page}&include_adult=${allowAdult}&language=${language}`;
      // eslint-disable-next-line no-console
      console.log(fullUrl);

      const movies = await this.getResource(fullUrl);

      return movies.results;
    };
  }
}
