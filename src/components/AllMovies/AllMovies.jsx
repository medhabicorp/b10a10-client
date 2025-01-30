import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MovieCard from "../MovieCard/MovieCard";
import PageTitle from "../PageTitle/PageTitle";

const AllMovies = () => {
  const loadMovies = useLoaderData();
  const [search, setSearch] = useState("");

  // Filter movies based on the search term
  const filteredMovies = loadMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div>
        <h1 className="font-bold text-xl lg:text-2xl w-[75%] lg:w-[30%] mx-auto my-2 lg:my-4 text-center border-3 py-2 rounded-xl border-orange-500">
          All Movies
        </h1>
      </div>

      {/* Search bar */}
      <div className="lg:w-[25%] md:w-[50%] w-[80%] mx-auto my-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input w-full p-2 border-2 rounded-xl"
        />
      </div>

      {/* Display filtered movies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-[90%] mx-auto my-4 items-center justify-center">
        {filteredMovies.length > 0 ? (
          filteredMovies?.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p className="text-center text-xl">No movies found.</p>
        )}
      </div>

      <PageTitle />
    </div>
  );
};

export default AllMovies;
