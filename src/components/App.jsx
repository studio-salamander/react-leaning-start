import React from "react";
// import { moviesData } from "../moviesData";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import MoviePaginator from "./MoviePaginator";

// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      totalResults: 0,
      totalPages: 0,
      currentPage: 1,
      pagerLeftBtnsDisabled: true,
      pagerRightBtnsDisabled: false,
    };

    // console.log("App constructor");
  }

  componentDidMount() {
    // console.log("App didMount");
    this.getMovies();
    // console.log("after fetch");
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("App didUpdate");
    // console.log("prev", prevProps, prevState);
    // console.log("this", this.props, this.state);
    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.currentPage !== this.state.currentPage
    ) {
      console.log("App call api");
      this.getMovies();
    }
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${this.state.sort_by}&page=${this.state.currentPage}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          movies: data.results,
          totalResults: data.total_results,
          totalPages: data.total_pages,
          currentPage: data.page,
        });
        // console.log("state", this.state);
      });
  };

  deleteMovie = (movie) => {
    // console.log(movie.id);
    const updateMovies = this.state.movies.filter(
      (item) => item.id !== movie.id
    );
    // console.log(updateMovies);

    // this.state.movies = updateMovies;
    this.setState({
      movies: updateMovies,
    });

    this.deleteMovieFromWillWatch(movie);
  };

  addMovieToWillWatch = (movie) => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch, movie];

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  deleteMovieFromWillWatch = (movie) => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      (item) => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch,
    });
  };

  updateSortBy = (value) => {
    this.setState({
      sort_by: value,
      currentPage: 1,
      pagerLeftBtnsDisabled: true,
      pagerRightBtnsDisabled: false,
    });
  };

  pagerGoFirst = () => {
    if (!this.state.pagerLeftBtnsDisabled) {
      this.setState({
        currentPage: 1,
        pagerLeftBtnsDisabled: true,
        pagerRightBtnsDisabled: false,
      });
    }
  };

  pagerGoPrevious = () => {
    if (!this.state.pagerLeftBtnsDisabled) {
      this.setState({
        currentPage: this.state.currentPage - 1,
        pagerLeftBtnsDisabled: this.state.currentPage - 1 > 1 ? false : true,
        pagerRightBtnsDisabled:
          this.state.currentPage - 1 < this.state.totalPages ? false : true,
      });
    }
  };

  pagerGoNumber = (pageNum = null) => {
    this.setState({
      currentPage: pageNum,
      pagerLeftBtnsDisabled:
        this.state.currentPage - 1 > 1 || this.state.currentPage + 1 > 1
          ? false
          : true,
      pagerRightBtnsDisabled:
        this.state.currentPage - 1 < this.state.totalPages ||
        this.state.currentPage + 1 < this.state.totalPages
          ? false
          : true,
    });
  };

  pagerGoNext = () => {
    if (!this.state.pagerRightBtnsDisabled) {
      this.setState({
        currentPage: this.state.currentPage + 1,
        pagerLeftBtnsDisabled: this.state.currentPage + 1 > 1 ? false : true,
        pagerRightBtnsDisabled:
          this.state.currentPage + 1 < this.state.totalPages ? false : true,
      });
    }
  };

  pagerGoLast = () => {
    if (!this.state.pagerRightBtnsDisabled) {
      this.setState({
        currentPage: this.state.totalPages,
        pagerLeftBtnsDisabled: false,
        pagerRightBtnsDisabled: true,
      });
    }
  };

  render() {
    // console.log("App render", this.state.sort_by, this.state.currentPage);
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row mb-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <MoviePaginator
                  // totalResults={this.state.totalResults}
                  currentPage={this.state.currentPage}
                  totalPages={this.state.totalPages}
                  pagerLeftBtnsDisabled={this.state.pagerLeftBtnsDisabled}
                  pagerRightBtnsDisabled={this.state.pagerRightBtnsDisabled}
                  pagerGoFirst={this.pagerGoFirst}
                  pagerGoPrevious={this.pagerGoPrevious}
                  pagerGoNumber={this.pagerGoNumber}
                  pagerGoNext={this.pagerGoNext}
                  pagerGoLast={this.pagerGoLast}
                />
              </div>
              <div className="col-12 text-center">
                {this.state.totalPages} pages totally
              </div>
            </div>
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      data={movie}
                      deleteMovie={this.deleteMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <h4>Will Watch: {this.state.moviesWillWatch.length} movies</h4>
            <ul className="list-group">
              {this.state.moviesWillWatch.map((movie) => (
                <li key={movie.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <p>{movie.title}</p>
                    <p>{movie.vote_average}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
