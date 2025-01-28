import React from "react";
import PropTypes from "prop-types";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MovieDetails = () => {
  const movie = useLoaderData();
  const navigate = useNavigate();

  if (!movie) {
    return (
      <div className="text-center text-red-500 text-2xl">Movie Not Found</div>
    );
  }

  const { _id, title, poster, genre, duration, releaseYear, rating, summary } =
    movie;

  // Function: delete movie
  const handleDeleteMovie = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Delete confirmed for movie ID:", _id);
        fetch(`http://localhost:5000/movies/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("Server response:", data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The movie has been deleted.",
                icon: "success",
              });
              navigate("/allmovies");
            }
          })
          .catch((error) => {
            console.error("Error deleting movie:", error);
          });
      }
    });
  };

  // Function to add movie to favorites
  const handleAddToFavorites = async () => {
    try {
      const response = await fetch(`http://localhost:5000/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      });

      if (response.ok) {
        alert(`"${title}" added to favorites!`);
      } else {
        alert("Failed to add movie to favorites.");
      }
    } catch (error) {
      console.error("Error adding movie to favorites:", error);
    }
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl lg:text-4xl w-[75%] lg:w-[50%] mx-auto my-4 lg:my-8 text-center border-2 lg:border-4 py-4 rounded-xl border-gray-900">
          Movie Name
          <br /> <span className="text-orange-400">{title}</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row bg-gray-900 text-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto mb-6">
        {/* Left Side - Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={poster}
            alt={title}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Right Side - Movie Details */}
        <div className="w-full md:w-2/3 px-6 flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2 text-yellow-400">{title}</h1>
          <p className="text-gray-400 text-lg mb-1">{releaseYear}</p>
          <p className="text-yellow-400 text-lg font-semibold mb-2">{genre}</p>
          <p className="text-white text-md mb-3">{summary}</p>

          {/* Rating and Duration */}
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-lg">
              {rating.toFixed(1)} / 5
            </span>
            <span className="bg-gray-700 px-3 py-1 rounded-lg">
              {duration} min
            </span>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 mt-4">
            <button className="bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer">
              Watch Now
            </button>
            <div className="flex justify-between gap-4">
              <button
                onClick={handleAddToFavorites}
                className="bg-yellow-500 hover:bg-yellow-700 px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer"
              >
                Add to Favorite
              </button>
              <button
                onClick={() => handleDeleteMovie(_id)}
                className="bg-gray-700 hover:bg-red-600 px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer"
              >
                Delete Movie
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    poster: PropTypes.string,
    genre: PropTypes.string,
    duration: PropTypes.number,
    releaseYear: PropTypes.number,
    rating: PropTypes.number,
    summary: PropTypes.string,
  }),
};

export default MovieDetails;
