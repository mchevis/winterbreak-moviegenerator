import React from "react";
import axios from "axios";
import MoviesList from "./MoviesList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
    };
    this.addMovie = this.addMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.changeRating = this.changeRating.bind(this);
  }

  async componentDidMount() {
    const { data: movies } = await axios.get("/api/movies");
    this.setState({ movies });
  }

  async addMovie() {
    const { data: addedMovie } = await axios.post("/api/movies");
    this.setState({ movies: [...this.state.movies, addedMovie] });
  }

  async deleteMovie(movieId) {
    await axios.delete(`/api/movies/${movieId}`);
    this.setState({
      movies: this.state.movies.filter((mov) => mov.id !== movieId),
    });
  }

  async changeRating(movieId, method) {
    const { data: updatedMovie } = await axios.put(`/api/movies/${movieId}`, {
      method,
    });
    //TODO: BUG - STATE DOESN'T UPDATE ON FIRST CLICK, JUST SUBSEQUENT ONES
    this.setState({
      movies: this.state.movies.map((mov) =>
        mov.id === updatedMovie.id ? updatedMovie : mov
      ),
    });
  }

  render() {
    const { movies } = this.state;
    const { addMovie, deleteMovie, changeRating } = this;
    return (
      <div id="main">
        <h1> Acme Movie Generator </h1>
        <button onClick={addMovie}>Generate Random Movie</button>
        <ul>
          <MoviesList
            movies={movies}
            deleteMovie={deleteMovie}
            changeRating={changeRating}
          />
        </ul>
      </div>
    );
  }
}

export default App;
