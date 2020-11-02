import React from 'react';
// import { Button } from 'antd';

import MovieList from '../movie-list';
import './app.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
    };
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="App">
        {/* <Button type="primary">Button</Button> */}
        <MovieList movie-list={movies} />
      </div>
    );
  }
}
