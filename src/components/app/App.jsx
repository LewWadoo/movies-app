import React from 'react';
import { Input, Spin, Alert } from 'antd';
import { debounce } from 'lodash';

import MovieList from '../movie-list';
import TmdbService from '../../services/tmdb-service';

import './app.css';
import tmdbIcon from './tmdb.svg';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.tmdbService = new TmdbService();

    this.state = {
      searchString: '',
      movies: [],
      isLoading: false,
      error: false,
    };

    this.handleError = () => {
      this.setState({
        movies: [],
        isLoading: false,
        error: true,
      });
    };

    this.search = () => {
      this.setState({
        isLoading: true,
      });
      const { searchString } = this.state;

      this.tmdbService
        .searchMovies(searchString, 'en-US', true)
        .then((movies) => {
          if (movies instanceof Error) {
            this.handleError();
          } else {
            this.setState({
              movies,
              isLoading: false,
              error: false,
            });
          }
        })
        .catch(this.handleError);
    };

    this.componentDidMount = () => {
      this.debouncedSearch = debounce(this.search, 500);
    };

    this.onChange = (event) => {
      if (!event) {
        return;
      }

      this.setState({
        searchString: event.currentTarget.value,
      });

      this.debouncedSearch();
    };
  }

  render() {
    const { movies, error, isLoading, searchString } = this.state;

    const spinner = isLoading ? <Spin /> : null;
    const alert = error ? (
      <Alert message="Oops! Something is possibly wrong with your Internet connection." type="error" />
    ) : null;
    const hasData = !(isLoading || error || movies === []);
    const didSearch = isLoading || error || movies !== [];
    const data = hasData && didSearch ? <MovieList movies={movies} /> : null;

    return (
      <div className="App">
        <div className="searchContainer">
          <Input.Search
            placeholder="Type to search…"
            prefix={<TMDbIcon />}
            size="small"
            onChange={this.onChange}
            value={searchString}
          />
        </div>
        {spinner}
        {alert}
        {data}
      </div>
    );
  }
}

const TMDbIcon = () => {
  return <img alt="TMDb" src={tmdbIcon} className="tmdbIcon" />;
};
