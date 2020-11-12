import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Rate, Image } from 'antd';

import './movie.css';

// import TmdbService from '../../services/tmdb-service';
import { TmdbServiceConsumer } from '../tmdb-service-context';

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

    const { id } = this.props;

    const imageSrc = posterPath === null ? '' : `https://image.tmdb.org/t/p/w500${posterPath}`;

    let dateFormatted;
    try {
      dateFormatted = format(new Date(releaseDate), 'MMMM d, yyyy');
    } catch (error) {
      dateFormatted = '';
    }

    return (
      <TmdbServiceConsumer>
        {({ rate }) => {
          return (
            <li className="movie-container">
              <Image alt="movie" src={imageSrc} />
              {/* className="movie-img" */}
              {/* <img alt="poster" src={imageSrc} className="movie-img" /> */}
              <div className="movie-stats">
                <div className="header">
                  <h5 className="title">{originalTitle}</h5>
                </div>
                <p className="movie-date">{dateFormatted}</p>
                <div className="movie-genres">Action Drama</div>
                <p className="movie-description">{this.truncateDescription(overview)}</p>
                <Rate allowHalf onChange={(value) => rate(value, id)} />
              </div>
            </li>
          );
        }}
      </TmdbServiceConsumer>
    );
  }
}

Movie.defaultProps = {
  poster_path: null,
  release_date: '',
};

Movie.propTypes = {
  original_title: PropTypes.string.isRequired,
  release_date: PropTypes.string,
  overview: PropTypes.string.isRequired,
  poster_path: PropTypes.string,
  id: PropTypes.number.isRequired,
};
