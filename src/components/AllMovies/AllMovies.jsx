import React from "react";
import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";

const AllMovies = (props) => {
  const loadMovies = useLoaderData();

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl lg:text-4xl w-[75%] lg:w-[50%] mx-auto my-4 lg:my-8 text-center border-2 lg:border-4 py-4 rounded-xl border-orange-400">
          All Movies
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] mx-auto my-4 items-center justify-center">
        {loadMovies?.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

AllMovies.propTypes = {};

export default AllMovies;
