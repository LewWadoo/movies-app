import React from 'react';
import PropTypes from 'prop-types';

import Movie from '../movie';

import './movie-list.css';

const MovieList = ({ movies }) => {
  const moviesView = movies.map((movie) => {
    return <Movie {...movie} key={movie.id} />;
  });

  return <ul className="movie-list">{moviesView}</ul>;
};

export default MovieList;

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};
