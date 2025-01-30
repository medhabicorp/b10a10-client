import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PageTitle from "../PageTitle/PageTitle";
import { authContext } from "../AuthProvider/AuthProvider";

const MovieDetails = () => {
  const movie = useLoaderData();
  const navigate = useNavigate();
  const { user } = useContext(authContext);

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
        // console.log("Delete confirmed for movie ID:", _id);
        fetch(`https://hero-movie-server-2.vercel.app//movies/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            // console.log("Server response:", data);
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
  const handleAddToFavorites = (event) => {
    event.preventDefault();

    const favoriteMovie = { ...movie, userEmail: user.email };

    // Send data to the server
    fetch("https://hero-movie-server-2.vercel.app//favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "The movie is already added to favorites.") {
          Swal.fire({
            title: "Info!",
            text: "The movie is already added to your favorites.",
            icon: "info",
            confirmButtonText: "Okay",
          });
        } else if (data.success) {
          Swal.fire({
            title: "Success!",
            text: `"${movie.title}" added to favorites!`,
            icon: "success",
            confirmButtonText: "Okay",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: data.message || "Failed to add the movie to favorites.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <div className="flex flex-col items-center mx-w-[90%] ">
      <div></div>

      <div className="flex flex-col md:flex-row bg-gray-900 text-white p-6 rounded-lg shadow-lg mx-auto mb-6 lg:max-w-[75%] mt-2 items-center">
        {/* Left Side - Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={poster}
            alt={title}
            className="rounded-lg shadow-lg w-full h-[90%]"
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
          <div className="flex flex-col gap-4 mt-4 ">
            <button className="bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer">
              Watch Now
            </button>
            <div className="flex flex-wrap justify-between gap-4 mt-8 items-center">
              <button
                onClick={handleAddToFavorites}
                className="border-yellow-500 border-2 hover:bg-yellow-700 px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer"
              >
                Add to Favorite
              </button>
              <Link to={`/update/${_id}`}>
                <button className="border-2 border-cyan-500 hover:bg-cyan-700 px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer text-white">
                  Update
                </button>
              </Link>
              <button
                onClick={() => handleDeleteMovie(_id)}
                className="border-2 border-red-600 hover:bg-red-600 px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer"
              >
                Delete Movie
              </button>
              <Link to="/allmovies">
                <button className=" border-2 border-green-600 hover:bg-green-800 px-6 py-2 rounded-lg text-lg font-semibold cursor-pointer">
                  ALL MOVIES
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <PageTitle />
    </div>
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
