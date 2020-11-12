import React from 'react';
import { Input, Spin, Alert, Pagination, Tabs } from 'antd';
import { debounce } from 'lodash';

import MovieList from '../movie-list';
import TmdbService from '../../services/tmdb-service';
import { TmdbServiceProvider } from '../tmdb-service-context';

import './app.css';
import tmdbIcon from './tmdb.svg';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: {
        currentPage: 1,
        searchString: '',
        movies: [],
        totalResults: 0,
      },
      isLoading: false,
      error: false,
      message: '',
    };

    this.handleError = (error) => {
      const { search } = this.state;
      const { searchString } = search;
      this.setState({
        search: {
          searchString,
          currentPage: 1,
          movies: [],
          totalResults: 0,
        },
        isLoading: false,
        error: true,
        message: error.message,
      });
    };

    this.search = (page = 1) => {
      const { search } = this.state;
      const { searchString } = search;
      if (typeof searchString === 'undefined') {
        return;
      }

      if (searchString.length === 0) {
        this.setState({
          search: {
            searchString,
            currentPage: page,
            movies: [],
            totalResults: 0,
          },
          isLoading: false,
          error: false,
          message: '',
        });
        return;
      }

      const { movies } = search;

      this.setState({
        search: {
          currentPage: page,
          searchString,
          movies,
          totalResults: 0,
        },
        isLoading: true,
        error: false,
        message: '',
      });
      this.tmdbService
        .searchMovies(searchString, page, 'en-US', true)
        .then((response) => {
          const { results } = response;
          const totalResults = response.total_results;
          if (totalResults === 0 && searchString.length > 0) {
            if (page > 1) {
              this.setState({
                search: {
                  movies: [],
                  searchString,
                  currentPage: page,
                  totalResults: 0,
                },
                isLoading: false,
                error: false,
                message: '',
              });
            } else {
              this.setState({
                search: {
                  movies: results,
                  searchString,
                  currentPage: page,
                  totalResults,
                },
                isLoading: false,
                error: true,
                message: 'Ты неудачник! Таких фильмов нет вообще!',
              });
            }
          } else {
            this.setState({
              search: {
                movies: results,
                searchString,
                currentPage: page,
                totalResults,
              },
              isLoading: false,
              error: false,
            });
          }
        })
        .catch(this.handleError);
    };

    this.componentDidMount = () => {
      this.tmdbService = new TmdbService();

      this.debouncedSearch = debounce(this.search, 500);
    };

    this.componentDidUpdate = () => {};

    this.onChange = (event) => {
      if (!event) {
        return;
      }

      const { search } = this.state;
      const { movies } = search;
      this.setState({
        search: {
          currentPage: 1,
          movies,
          searchString: event.currentTarget.value,
          totalResults: 0,
        },
        isLoading: true,
      });

      this.debouncedSearch();
    };
  }

  render() {
    const { error, isLoading, message, search } = this.state;
    const { movies, searchString, currentPage, totalResults } = search;

    const spinner = isLoading ? <Spin /> : null;
    const alert = error ? <Alert message={message} type="error" /> : null;
    const hasData = !(isLoading || error || movies === []);
    const didSearch = isLoading || error || movies !== [];
    const data = hasData && didSearch ? <MovieList movies={movies} /> : null;

    // const rated = <MovieList movies={ratedMovies}/>;
    const { TabPane } = Tabs;

    return (
      <div className="app">
        <TmdbServiceProvider value={this.tmdbService}>
          <Tabs defaultActiveKey="1" className="app">
            <TabPane tab="Search" key="1" className="app">
              <div className="searchContainer">
                <Input.Search
                  placeholder="Type to search…"
                  prefix={<img alt="TMDb" src={tmdbIcon} className="tmdbIcon" />}
                  size="small"
                  onChange={this.onChange}
                  value={searchString}
                />
              </div>
              {spinner}
              {alert}
              {data}
              <Pagination
                current={currentPage}
                pageSize={20}
                responsive
                onChange={this.search}
                total={totalResults}
                showSizeChanger={false}
              />
            </TabPane>
            <TabPane tab="Rated" key="2" className="tabPane">
              {data}
            </TabPane>
          </Tabs>
        </TmdbServiceProvider>
      </div>
    );
  }
}

// const TMDbIcon = () => {
//   return
// };
