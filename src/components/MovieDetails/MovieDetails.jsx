import React from "react";
import PropTypes from "prop-types";
import { useLoaderData } from "react-router-dom";

const MovieDetails = () => {
  const movie = useLoaderData();

  if (!movie) {
    return (
      <div className="text-center text-red-500 text-2xl">Movie Not Found</div>
    );
  }

  const { title, poster, genre, duration, releaseYear, rating, summary } =
    movie;
  console.log(summary);

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl lg:text-4xl w-[75%] lg:w-[50%] mx-auto my-4 lg:my-8 text-center border-2 lg:border-4 py-4 rounded-xl border-gray-900">
          Movie Name
          <br /> <span className="text-orange-400">{title}</span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-6">
        {/* image div */}
        <div className="w-full md:w-1/3">
          <img
            src={poster}
            alt={title}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Movie Details */}
        <div className="w-full md:w-2/3 px-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2 text-yellow-400">{title}</h1>
          <p className="text-gray-400 text-lg mb-1">{releaseYear}</p>
          <p className="text-yellow-400 text-lg font-semibold mb-2">{genre}</p>
          <p className="text-white text-md mb-3">{summary}</p>

          {/* Rating and Duration */}
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-lg">
              ⭐ {rating.toFixed(1)} / 5
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded-lg">
              {duration} min
            </span>
          </div>

          {/* Watch Now Button */}
          <button className="cursor-pointer bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg text-lg font-semibold mt-2">
            🎬 Watch Now
          </button>
        </div>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster: PropTypes.string,
    genre: PropTypes.string,
    duration: PropTypes.number,
    releaseYear: PropTypes.number,
    rating: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default MovieDetails;
