import React, { Component } from "react";
import * as movieService from "../services/fakeMovieService";
import Like from "./Like";

class Movies extends Component {
  state = {
    movies: movieService.getMovies(),
  };

  handleDelete = (arg) => {
    this.setState({ movies: movieService.deleteMovie(arg.id) });
  };

  handleLike = (arg) => {
    
    const movies = [...this.state.movies] // make a copy
    const index = movies.indexOf(arg.movie)
    movies[index] = {...movies[index]}
    movies[index].liked = !movies[index].liked
    this.setState({movies:movies})
  };

  render() {
    let { movies } = this.state;

    if (movies.length === 0)
      return <p className="m-2"> No movies in DataBase </p>;

    return (
      <>
        <p className="m-2"> {movies.length} movies in DataBase </p>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">NumberInStock</th>
              <th scope="col">DailyRentalRate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {movies.map((m, index) => {
              return (
                <tr>
                  <th scope="row">{index}</th>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <Like
                      key={m._id}
                      liked={m.liked}
                      onClick={() => this.handleLike({ movie:m})}
                      />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete({ id: m._id })}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;
