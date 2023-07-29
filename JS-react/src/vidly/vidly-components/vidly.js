import React, { Component } from "react";
import Pagination from '../vidly-common/pagination'

import { getMovies }  from "../vidly-services/fakeMovieService"

class Vidly extends Component {
  /* state */
  state = {
    movies: getMovies(),
    pageSize:4,
    currentPage:1 // default
  };

  /* function */
  
  /** updates current page */
  handlePageChange=(currentPage)=>{
    this.setState({currentPage:currentPage})
  }

  /* renders */
  render() {
    const { movies, pageSize,currentPage } = this.state;
    const itemCounts = movies.length


    return (
      <>
      <table className="table table-dark">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((m) => {
            return (
              <tr>
                <td >{m.title}</td>
                <td>{m.genre.name}</td>
                <td>{m.numberInStock}</td>
                <td>{m.dailyRentalRate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    <Pagination
    itemCounts={itemCounts}
    pageSize={pageSize}
    currentPage={currentPage}
    onPageChange={this.handlePageChange}
    />
    </>
    );

  }
}
export default Vidly;
