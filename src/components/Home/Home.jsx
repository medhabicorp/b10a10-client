import React, { useState } from "react";
import PropTypes from "prop-types";
import Banner from "../Banner/Banner";
import { NavLink, useLoaderData } from "react-router-dom";
import MovieCard from "./../MovieCard/MovieCard";

const Home = (props) => {
  const loadMovies = useLoaderData();
  const [movies, setMovies] = useState(loadMovies);
  return (
    <div>
      {/* Banner */}
      <div>
        <Banner />
      </div>

      {/* featured Movies  */}
      <div>
        <h1 className="font-bold text-3xl lg:text-4xl w-[75%] lg:w-[50%] mx-auto my-4 lg:my-8 text-center border-2 lg:border-4 py-4 rounded-xl border-orange-400">
          Featured Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-[90%] mx-auto my-4 items-center justify-center">
          {movies
            ?.sort((a, b) => b.rating - a.rating)
            .slice(0, 6)
            .map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                movies={movies}
                setMovies={setMovies}
              />
            ))}
        </div>
        <button className=" mx-auto  block btn btn-outline border-2 border-[#f05122] text-[#f05122] my-4 btn-neutral">
          <NavLink to="/allmovies">All Movies</NavLink>
        </button>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
