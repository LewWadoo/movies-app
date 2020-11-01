import React from 'react';

import Movie from '../movie';
import TmdbService from '../../services/tmdb-service';

import './movie-list.css';

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.tmdbService = new TmdbService();

    this.state = {
      movies: [],
    };

    this.tmdbService.searchMovies('return').then((movies) => {
      this.setState({
        movies,
      });
    });
  }

  render() {
    const { movies } = this.state;

    return (
      <ul className="movie-list">
        {movies.map((movie) => {
          return <Movie {...movie} key={movie.id} />;
        })}
      </ul>
    );
  }
}
