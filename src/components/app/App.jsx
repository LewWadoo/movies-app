import React from 'react';
import { Button } from 'antd';

import MovieList from '../movie-list/movie-list.jsx';
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">Button</Button>
        <MovieList />
      </div>
    );
  }
}
