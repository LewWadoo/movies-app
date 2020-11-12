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

      return this.getResource(fullUrl);
    };

    this.createGuestSession = async () => {
      const guestSessionUrl = `$(this.baseURL}/authentication/guest_session/new`;
      const fullUrl = `${guestSessionUrl}?&api_key=${this.apiKey}`;

      let response;
      try {
        response = await this.getResource(fullUrl);
        if (!response.ok) {
          throw new Error('No guest sessions today!');
        }
      } catch (error) {
        return null;
      }

      const guestSessionObject = await response.json();
      // eslint-disable-next-line no-console
      console.log('guestSessionObject', guestSessionObject);
      const guestSessionId = guestSessionObject.guest_session_id;

      return guestSessionId;
    };

    this.guestSessionId = null;

    this.rate = async (value, id) => {
      const rateUrl = `${this.baseURL}/movie/${id}/rating`;
      if (this.guestSessionId === null) {
        this.guestSessionId = this.createGuestSession();
      }
      const fullUrl = `${rateUrl}?&api_key=${this.apiKey}&guest_session_id=${this.guestSessionId}`;
      //             	      // eslint-disable-next-line no-debugger
      // debugger;

      // const rating = value;
      const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: { value },
      };

      let response;
      try {
        response = await fetch(fullUrl, fetchOptions);
        if (!response.ok) {
          throw new Error(`Твоё мнение здесь никого не волнует!`);
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      }
    };
  }
}
