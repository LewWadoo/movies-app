import React from 'react';

import Movie from '../movie/movie.jsx';

export default class MovieList extends React.Component {
  render() {
    return (
      <div className="movie-list">
        <Movie />
        <Movie />
      </div>
    );
  }
}
