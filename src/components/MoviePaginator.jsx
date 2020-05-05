import React from "react";
import classnames from "classnames";

class MoviePaginator extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentPage !== this.props.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      currentPage,
      totalPages,
      pagerLeftBtnsDisabled,
      pagerRightBtnsDisabled,
      pagerGoFirst,
      pagerGoPrevious,
      pagerGoNumber,
      pagerGoNext,
      pagerGoLast,
    } = this.props;

    const getDIsabledClassName = (value) => {
      return classnames({
        "page-item": true,
        disabled: value,
      });
    };

    const getActiveClassName = (value) => {
      return classnames({
        "page-item": true,
        active: value === currentPage,
      });
    };

    const handlePagerClick = (direct, pageNum) => () => {
      if (direct === "first") {
        pagerGoFirst();
      } else if (direct === "prev") {
        pagerGoPrevious();
      } else if (direct === "next") {
        pagerGoNext();
      } else if (direct === "last") {
        pagerGoLast();
      } else {
        pagerGoNumber(pageNum);
      }
    };

    const generatePageNumsLi = () => {
      let container = [];

      let start = 1;
      let count = 5;
      if (currentPage >= 3) {
        if (currentPage <= totalPages - 3) {
          start = currentPage - 2;
          count = currentPage + 2;
        } else {
          start = totalPages - 4;
          count = totalPages;
        }
      }
      for (let i = start; i <= count; i++) {
        container.push(
          <li
            key={i}
            className={getActiveClassName(i)}
            onClick={handlePagerClick("number", i)}
          >
            <a className="page-link" href="#">
              {i}
            </a>
          </li>
        );
      }

      return container;
    };

    // console.log("MoviePaginator render");

    return (
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li
            className={getDIsabledClassName(pagerLeftBtnsDisabled)}
            onClick={handlePagerClick("first")}
          >
            <a className="page-link" href="#" aria-label="First">
              First
            </a>
          </li>
          <li
            className={getDIsabledClassName(pagerLeftBtnsDisabled)}
            onClick={handlePagerClick("prev")}
          >
            <a className="page-link" href="#" aria-label="Previous">
              Previous
            </a>
          </li>
          {generatePageNumsLi()}
          <li
            className={getDIsabledClassName(pagerRightBtnsDisabled)}
            onClick={handlePagerClick("next")}
          >
            <a className="page-link" href="#" aria-label="Next">
              Next
            </a>
          </li>
          <li
            className={getDIsabledClassName(pagerRightBtnsDisabled)}
            onClick={handlePagerClick("last")}
          >
            <a className="page-link" href="#" aria-label="Next">
              Last
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default MoviePaginator;
