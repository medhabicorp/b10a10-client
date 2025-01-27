import React, { useState, useContext } from "react";
import { authContext } from "../AuthProvider/AuthProvider"; // Assuming authContext provides user info
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import "./AddMovies.css"; // Create this CSS for styling

const AddMovies = () => {
  const { user } = useContext(authContext); // Get user info from context
  const [formData, setFormData] = useState({
    poster: "",
    title: "",
    genre: "",
    duration: "",
    releaseYear: "",
    rating: 0,
    summary: "",
  });

  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle rating changes
  const handleRatingChange = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    if (
      !formData.poster ||
      !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(formData.poster)
    ) {
      newErrors.poster = "Invalid image URL.";
    }
    if (!formData.title || formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters long.";
    }
    if (!formData.genre) {
      newErrors.genre = "Please select a genre.";
    }
    if (!formData.duration || formData.duration < 60) {
      newErrors.duration = "Duration must be greater than 60 minutes.";
    }
    if (!formData.releaseYear) {
      newErrors.releaseYear = "Please select a release year.";
    }
    if (!formData.rating) {
      newErrors.rating = "Please provide a rating.";
    }
    if (!formData.summary || formData.summary.length < 10) {
      newErrors.summary = "Summary must be at least 10 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const movieData = { ...formData, userEmail: user?.email };

    try {
      const response = await fetch("http://localhost:5000/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        Swal.fire("Success", "Movie added successfully!", "success");
        setFormData({
          poster: "",
          title: "",
          genre: "",
          duration: "",
          releaseYear: "",
          rating: 0,
          summary: "",
        });
      } else {
        Swal.fire("Error", "Failed to add movie.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while adding the movie.", "error");
    }
  };

  return (
    <div className="add-movie-container">
      <h1 className="font-bold text-2xl mb-4">Add a Movie</h1>
      <form onSubmit={handleSubmit} className="form">
        {/* Movie Poster */}
        <div className="form-group">
          <label htmlFor="poster">Movie Poster (URL):</label>
          <input
            type="text"
            id="poster"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            className="input"
          />
          {errors.poster && <span className="error">{errors.poster}</span>}
        </div>

        {/* Movie Title */}
        <div className="form-group">
          <label htmlFor="title">Movie Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        {/* Genre */}
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="select"
          >
            <option value="">Select Genre</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Action">Action</option>
          </select>
          {errors.genre && <span className="error">{errors.genre}</span>}
        </div>

        {/* Duration */}
        <div className="form-group">
          <label htmlFor="duration">Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="input"
          />
          {errors.duration && <span className="error">{errors.duration}</span>}
        </div>

        {/* Release Year */}
        <div className="form-group">
          <label htmlFor="releaseYear">Release Year:</label>
          <select
            id="releaseYear"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            className="select"
          >
            <option value="">Select Year</option>
            {[...Array(75)].map((_, i) => (
              <option key={1950 + i} value={1950 + i}>
                {1950 + i}
              </option>
            ))}
          </select>
          {errors.releaseYear && (
            <span className="error">{errors.releaseYear}</span>
          )}
        </div>

        {/* Rating */}
        <div className="form-group">
          <label>Rating:</label>
          <Rating
            onClick={handleRatingChange}
            ratingValue={formData.rating}
            className="rating"
          />
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>

        {/* Summary */}
        <div className="form-group">
          <label htmlFor="summary">Summary:</label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className="textarea"
          />
          {errors.summary && <span className="error">{errors.summary}</span>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn-submit">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default AddMovies;
