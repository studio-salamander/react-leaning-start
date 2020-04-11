import React from "react";

class MovieItem extends React.Component {
  state = {
    willWatch: false,
  };

  render() {
    const {
      data,
      deleteMovie,
      addMovieToWillWatch,
      deleteMovieFromWillWatch,
    } = this.props;
    // props.data = {};
    return (
      <div className="card">
        <img
          className="card-img-top"
          src={`https://image.tmdb.org/t/p/w500${
            data.backdrop_path || data.poster_path
          }`}
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{data.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {data.vote_average}</p>
            <button
              type="button"
              className={[
                "btn",
                this.state.willWatch ? "btn-success" : "btn-secondary",
              ].join(" ")}
              onClick={() => {
                this.setState({
                  willWatch: this.state.willWatch ? false : true,
                });
                this.state.willWatch
                  ? deleteMovieFromWillWatch(data)
                  : addMovieToWillWatch(data);
              }}
            >
              {this.state.willWatch ? "Remove Will Watch" : "Will Watch"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              deleteMovie(data);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default MovieItem;
