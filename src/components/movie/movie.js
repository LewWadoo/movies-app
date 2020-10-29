import React from 'react';

export default class Movie extends React.Component {
  render() {
    return (
      <div className="movie-container">
        <div>
          <img alt="movie" src="the-way-back.png" className="movie-img" />
        </div>
        <div className="movie-stats">
          <h5>The way back</h5>
          <p className="movie-date">2020-10-29</p>
          <div className="movie-genres">Action Drama</div>
          <p className="movie-description">
            loren Quis hendrerit dolor magna eget est lorem ipsum dolor sit amet, consectetur.
            Ullamcorper sit amet risus nullam eget felis eget nunc lobortis mattis aliquam faucibus
            purus in massa tempor nec?
          </p>
        </div>
      </div>
    );
  }
}
