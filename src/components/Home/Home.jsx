import React, { useState } from "react";
import PropTypes from "prop-types";
import Banner from "../Banner/Banner";
import { Link, useLoaderData } from "react-router-dom";
import MovieCard from "./../MovieCard/MovieCard";
import Pricing from "../Pricing/Pricing";
import Review from "../Review/Review";
import PageTitle from "../PageTitle/PageTitle";

const Home = (props) => {
  const loadMovies = useLoaderData() || [];
  const [movies, setMovies] = useState(loadMovies);

  // Theme state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // sort movies by rating
  const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header with Theme Toggle */}
      <header className="flex justify-between items-center px-4 py-2 shadow-lg mr-4">
        <button
          onClick={toggleTheme}
          className="cursor-pointer p-2 border rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <h1 className="text-2xl font-bold">Home</h1>
      </header>

      {/* Banner */}
      <div>
        <Banner />
      </div>

      {/* Featured Movies */}
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-3xl lg:text-4xl w-[75%] lg:w-[50%] mx-auto my-4 lg:my-8 text-center border-2 lg:border-4 py-4 rounded-xl border-orange-400">
          Featured Movies
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] mx-auto my-4 items-center justify-center">
          {sortedMovies?.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              movies={movies}
              setMovies={setMovies}
            />
          ))}
        </div>
        <Link to="/allmovies">
          <button className="bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer text-white my-8">
            ALL MOVIES
          </button>
        </Link>
      </div>

      {/* Pricing and Plans */}
      <div>
        <Pricing />
      </div>

      {/* Reviews */}
      <div>
        <Review />
      </div>
      <PageTitle />
    </div>
  );
};

Home.propTypes = {};

export default Home;
