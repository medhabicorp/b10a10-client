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
    setUpdatedRating(rate / 20); // Assuming the Rating library provides 0-100, normalize to 0-5.
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
    if (!updatedReleaseYear) {
      newErrors.releaseYear = "Please select a valid release year.";
    }
    if (!updatedRating || updatedRating <= 0) {
      newErrors.rating = "Please provide a valid rating.";
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

    // Send updated data to server
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

        {/* Other fields remain the same */}
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
