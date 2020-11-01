import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import './movie.css';

export default class Movie extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      originalTitle: props.original_title,
      releaseDate: props.release_date,
      overview: props.overview,
      posterPath: props.poster_path,
    };

    this.truncateDescription = (description) => {
      const indexOfSpaceAfterTruncate = description.indexOf(' ', 200);
      return description.slice(0, indexOfSpaceAfterTruncate).concat('…');
    };
  }

  render() {
    const { originalTitle, releaseDate, overview, posterPath } = this.state;
    const dateFormatted = format(new Date(releaseDate), 'MMMM d, yyyy');

    return (
      <li className="movie-container">
        <img alt="movie" src={`https://image.tmdb.org/t/p/w500${posterPath}`} className="movie-img" />
        <div className="movie-stats">
          <h5>{originalTitle}</h5>
          <p className="movie-date">{dateFormatted}</p>
          <div className="movie-genres">Action Drama</div>
          <p className="movie-description">{this.truncateDescription(overview)}</p>
        </div>
      </li>
    );
  }
}

Movie.propTypes = {
  original_title: PropTypes.string.isRequired,
  release_date: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string.isRequired,
};
