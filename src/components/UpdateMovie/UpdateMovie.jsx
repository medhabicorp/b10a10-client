import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Rating } from "react-simple-star-rating";
import PageTitle from "../PageTitle/PageTitle";
import PropTypes from "prop-types";

const UpdateMovies = () => {
  const movie = useLoaderData();
  const { _id, poster, title, genre, duration, releaseYear, rating, summary } =
    movie;

  const [updatedRating, setUpdatedRating] = useState(rating || 0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRating = (rate) => {
    setUpdatedRating(rate); // Assuming the Rating library uses a range of 0–5
  };

  const handleUpdateMovie = (event) => {
    event.preventDefault();

    const form = event.target;
    const updatedPoster = form.poster.value.trim();
    const updatedTitle = form.title.value.trim();
    const updatedGenre = form.genre.value;
    const updatedDuration = parseInt(form.duration.value, 10);
    const updatedReleaseYear = parseInt(form.releaseYear.value, 10);
    const updatedSummary = form.summary.value.trim();

    const newErrors = {};

    // Validation
    if (
      !updatedPoster ||
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif|svg)$/i.test(updatedPoster)
    ) {
      newErrors.poster = "Insert a valid image URL.";
    }
    if (!updatedTitle || updatedTitle.length < 2) {
      newErrors.title = "Title must be at least 2 characters long.";
    }
    if (!updatedGenre) {
      newErrors.genre = "Please select a genre.";
    }
    if (!updatedDuration || updatedDuration < 60) {
      newErrors.duration = "Duration must be greater than 60 minutes.";
    }
    if (
      !updatedReleaseYear ||
      updatedReleaseYear < 1950 ||
      updatedReleaseYear > new Date().getFullYear()
    ) {
      newErrors.releaseYear = "Please select a valid release year.";
    }
    if (!updatedRating || updatedRating <= 0 || updatedRating > 5) {
      newErrors.rating = "Please provide a valid rating between 1 and 5.";
    }
    if (!updatedSummary || updatedSummary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters long.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const updatedMovie = {
      poster: updatedPoster,
      title: updatedTitle,
      genre: updatedGenre,
      duration: updatedDuration,
      releaseYear: updatedReleaseYear,
      rating: updatedRating,
      summary: updatedSummary,
    };

    // Send updated data to the server
    fetch(`https://b10a10-movie-server.vercel.app/movies/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Success", "Movie updated successfully!", "success");
          navigate(`/details/${_id}`);
        } else {
          Swal.fire("Error", "Failed to update movie.", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "An error occurred while updating the movie.",
          "error"
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-200">
      <h1 className="font-bold text-xl lg:text-2xl w-[75%] lg:w-[30%] mx-auto my-2 lg:my-4 text-center border-3 py-2 rounded-xl border-orange-500">
        Update Movie
      </h1>
      <form
        onSubmit={handleUpdateMovie}
        className="bg-white shadow-xl p-6 rounded-xl w-[90%] lg:w-1/2 mb-12 flex flex-col gap-3"
      >
        {/* Movie Poster */}
        <div>
          <label htmlFor="poster" className="font-bold text-xl">
            Movie Poster (URL):
          </label>
          <input
            type="text"
            id="poster"
            name="poster"
            defaultValue={poster}
            className="input w-full"
          />
          {errors.poster && (
            <span className="error text-red-500">{errors.poster}</span>
          )}
        </div>

        {/* Movie Title */}
        <div>
          <label htmlFor="title" className="font-bold text-xl">
            Movie Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            defaultValue={title}
            className="input w-full"
          />
          {errors.title && (
            <span className="error text-red-500">{errors.title}</span>
          )}
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="font-bold text-xl">
            Genre:
          </label>
          <select
            id="genre"
            name="genre"
            defaultValue={genre}
            className="select w-full"
          >
            <option value="">Select Genre</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Action">Action</option>
          </select>
          {errors.genre && (
            <span className="error text-red-500">{errors.genre}</span>
          )}
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="font-bold text-xl">
            Duration (minutes):
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            defaultValue={duration}
            className="input w-full"
          />
          {errors.duration && (
            <span className="error text-red-500">{errors.duration}</span>
          )}
        </div>

        {/* Release Year */}
        <div>
          <label htmlFor="releaseYear" className="font-bold text-xl">
            Release Year:
          </label>
          <select
            id="releaseYear"
            name="releaseYear"
            defaultValue={releaseYear}
            className="select w-full"
          >
            <option value="">Select Year</option>
            {[...Array(76)].map((_, i) => (
              <option key={1950 + i} value={1950 + i}>
                {1950 + i}
              </option>
            ))}
          </select>
          {errors.releaseYear && (
            <span className="error text-red-500">{errors.releaseYear}</span>
          )}
        </div>

        {/* Rating */}
        <div>
          <label htmlFor="rating" className="font-bold text-xl">
            Rating:
          </label>
          <div className="flex gap-2 items-center">
            <Rating
              onClick={handleRating}
              initialValue={updatedRating}
              size={35}
              fillColor="gold"
              emptyColor="gray"
              allowFraction={false}
            />
            <span className="text-lg text-white bg-gray-500 px-4 py-2 rounded-xl">
              {typeof updatedRating === "number" ? updatedRating : "N/A"} / 5
            </span>
          </div>
          {errors.rating && (
            <span className="error text-red-500">{errors.rating}</span>
          )}
        </div>

        {/* Summary */}
        <div>
          <label htmlFor="summary" className="font-bold text-xl">
            Summary:
          </label>
          <textarea
            id="summary"
            name="summary"
            defaultValue={summary}
            className="textarea w-full"
          ></textarea>
          {errors.summary && (
            <span className="error text-red-500">{errors.summary}</span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn bg-[#f05122] text-white hover:bg-amber-600 text-lg"
        >
          Update Movie
        </button>
      </form>
      <PageTitle />
    </div>
  );
};

UpdateMovies.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    releaseYear: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
  }),
};

export default UpdateMovies;
