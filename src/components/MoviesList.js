import React from "react";

const MoviesList = (props) => {
  const { movies, deleteMovie, changeRating } = props;
  return (
    <div>
      {movies.map((mov) => (
        <div key={mov.id}>
          <button onClick={() => deleteMovie(mov.id)} id="delete">
            X
          </button>
          <span>
            {mov.name} ({mov.rating})
          </span>
          <button
            id="subtract"
            onClick={() => changeRating(mov.id, "subtract")}
          >
            -
          </button>
          <button id="add" onClick={() => changeRating(mov.id, "add")}>
            +
          </button>
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
