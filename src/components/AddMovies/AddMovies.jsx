import React, { useContext, useState } from "react";
import { authContext } from "../AuthProvider/AuthProvider"; // Assuming authContext provides user info
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import PageTitle from "../PageTitle/PageTitle";

const AddMovies = () => {
  const { user } = useContext(authContext);

  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(0);

  const handleRating = (rate) => {
    setRating(rate);
  };
  // Optional callback functions
  const onPointerEnter = () => console.log("Pointer Entered");
  const onPointerLeave = () => console.log("Pointer Left");
  const onPointerMove = (value, index) =>
    console.log("Value:", value, "Index:", index);

  const handleAddMovie = (event) => {
    event.preventDefault();

    const form = event.target;
    const poster = form.poster.value;
    const title = form.title.value;
    const genre = form.genre.value;
    const duration = form.duration.value;
    const releaseYear = form.releaseYear.value;
    const summary = form.summary.value;

    const newErrors = {};

    // Validate fields
    if (!poster || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(poster)) {
      newErrors.poster = "Insert a valid image URL.";
    }
    if (!title || title.length < 2) {
      newErrors.title = "Title must be at least 2 characters long.";
    }
    if (!genre) {
      newErrors.genre = "Please select a genre.";
    }
    if (!duration || duration < 60) {
      newErrors.duration = "Duration must be greater than 60 minutes.";
    }
    if (!releaseYear) {
      newErrors.releaseYear = "Please select a release year.";
    }
    if (!rating || rating <= 0) {
      newErrors.rating = "Please provide a valid rating.";
    }
    if (!summary || summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters long.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    // Prepare movie data
    const newMovie = {
      poster,
      title,
      genre,
      duration: parseInt(duration),
      releaseYear,
      rating,
      summary,
      userEmail: user?.email,
    };

    // Send data to the server
    fetch("https://b10a10-movie-server.vercel.app/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          Swal.fire("Success", "Movie added successfully!", "success");
          form.reset();
          setErrors({});
          setRating(0);
        } else {
          Swal.fire("Error", "Failed to add movie.", "error");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        Swal.fire(
          "Error",
          "An error occurred while adding the movie.",
          "error"
        );
      });
  };

  return (
    <div className="flex flex-col items-center justify-center bg-base-200">
      <h1 className="font-bold text-xl lg:text-2xl w-[75%] lg:w-[30%] mx-auto my-2 lg:my-4 text-center border-3 py-2 rounded-xl border-orange-500">
        Add A Movie
      </h1>
      <form
        onSubmit={handleAddMovie}
        className="bg-white shadow-xl p-6 rounded-xl  w-[90%] lg:w-1/2 mb-12 flex flex-col gap-3"
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
          <input type="text" id="title" name="title" className="input w-full" />
          {errors.title && (
            <span className="error text-red-500">{errors.title}</span>
          )}
        </div>

        {/* Genre */}
        <div>
          <label htmlFor="genre" className="font-bold text-xl">
            Genre:
          </label>
          <select id="genre" name="genre" className="select w-full">
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
          <select id="releaseYear" name="releaseYear" className="select w-full">
            <option value="">Select Year</option>
            {[...Array(76)]?.map((_, i) => (
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
              initialValue={rating}
              size={35}
              fillColor="gold"
              emptyColor="gray"
              allowFraction={true}
            />
            {/* Display Rating Value */}
            <span className="text-lg text-white bg-gray-500 px-4 py-2 rounded-xl">
              {rating.toFixed(1)} / 5
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
          Add Movie
        </button>
      </form>
      <PageTitle />
    </div>
  );
};

export default AddMovies;
