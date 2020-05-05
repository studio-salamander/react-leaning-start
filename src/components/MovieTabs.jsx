import React from "react";
import classnames from "classnames";

class MovieTabs extends React.Component {
  // componentWillReceiveProps(nextProps, nextState) {
  //   console.log("MovieTabs willReceiveProps");
  //   console.log("next sort_by", nextProps.sort_by);
  //   console.log("this sort_by", this.props.sort_by);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.sort_by !== this.props.sort_by) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { sort_by, updateSortBy } = this.props;

    const handleClick = (value) => () => {
      updateSortBy(value);
    };

    const getClassName = (value) => {
      return classnames({
        "nav-link": true,
        active: sort_by === value,
      });
    };

    // console.log("MovieTabs render");

    return (
      <ul className="tabs nav nav-pills justify-content-center">
        <li className="nav-item">
          <div
            className={getClassName("popularity.desc")}
            onClick={handleClick("popularity.desc")}
          >
            Popularity desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassName("revenue.desc")}
            onClick={handleClick("revenue.desc")}
          >
            Revenue desc
          </div>
        </li>
        <li className="nav-item">
          <div
            className={getClassName("vote_average.desc")}
            onClick={handleClick("vote_average.desc")}
          >
            Vote Average desc
          </div>
        </li>
      </ul>
    );
  }
}

export default MovieTabs;
