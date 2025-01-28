import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "animate.css";

const MovieCard = ({ movie }) => {
  const { _id, title, poster, genre, duration, releaseYear, rating } = movie;

  return (
    <div className="relative group w-full rounded-lg shadow-xl overflow-hidden bg-gray-100 h-fit p-2">
      <figure className="w-full h-full">
        <img className="h-full w-full object-cover" src={poster} alt={title} />
      </figure>

      <div className="card-body absolute bottom-0 text-gray-200 w-full bg-emerald-100 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h2 className="card-title font-bold text-2xl text-gray-600">{title}</h2>
        <div className="grid grid-cols-2 justify-between gap-4 mt-2">
          <p className="text-md bg-gray-600 text-center rounded-xl">{genre}</p>
          <p className="text-md bg-gray-600 text-center rounded-xl">
            {duration} minutes
          </p>
          <p className="text-md bg-gray-600 text-center rounded-xl">
            {releaseYear}
          </p>
          <p className="text-md bg-gray-600 text-center rounded-xl">
            {rating.toFixed(1)} / 5
          </p>
        </div>
        <div className="card-actions justify-end mt-3">
          <NavLink to={`/details/${_id}`}>
            <button className="p-2 text-lg font-bold cursor-pointer btn-primary text-white border-2 bg-gray-700 hover:border-amber-300 hover:bg-amber-100 hover:text-gray-700">
              See Details
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
