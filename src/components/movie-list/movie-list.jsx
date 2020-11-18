import React from 'react';
import PropTypes from 'prop-types';

import Movie from '../movie';

import './movie-list.css';

export default class MovieList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { movies, onRate } = this.props;
    const moviesView = movies.map((movie) => {
      return <Movie onRate={onRate} {...movie} key={movie.id} />;
    });

    return <ul className="movie-list">{moviesView}</ul>;
  }
}

MovieList.defaultProps = {
  movies: [],
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  onRate: PropTypes.func.isRequired,
};
