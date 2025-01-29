import React, { useState } from "react";
import PropTypes from "prop-types";
import Banner from "../Banner/Banner";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import MovieCard from "./../MovieCard/MovieCard";
import Pricing from "../Pricing/Pricing";
import Review from "../Review/Review";
import PageTitle from "../PageTitle/PageTitle";

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
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl lg:text-4xl w-[75%] lg:w-[50%] mx-auto my-4 lg:my-8 text-center border-2 lg:border-4 py-4 rounded-xl border-orange-400">
          Featured Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[90%] mx-auto my-4 items-center justify-center">
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
        <Link to="/allmovies">
          <button className="bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer text-white  my-8">
            ALL MOVIES
          </button>
        </Link>
      </div>

      {/* Pricing and plans */}
      <div>
        <Pricing />
      </div>

      {/* review */}
      <div>
        <Review />
      </div>
      <PageTitle />
    </div>
  );
};

Home.propTypes = {};

export default Home;
