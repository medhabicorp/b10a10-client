import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";

const FavoriteMovies = () => {
  const { user } = useContext(authContext); // Get the logged-in user's information
  const [favorites, setFavorites] = useState([]);

  // Fetch user's favorite movies from the database

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/favorites/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
        })
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [user]);

  // Handle deleting a favorite movie
  const handleDeleteFavorite = (id) => {
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
        fetch(`http://localhost:5000/favorites/${id}?email=${user.email}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire(
                "Deleted!",
                "The favorite movie has been removed.",
                "success"
              );
              setFavorites((prev) => prev.filter((fav) => fav._id !== id)); // Update UI
            } else {
              Swal.fire(
                "Error!",
                data.message || "Failed to delete the movie.",
                "error"
              );
            }
          })
          .catch((error) => {
            console.error("Error deleting favorite:", error);
            Swal.fire("Error!", "An unexpected error occurred.", "error");
          });
      }
    });
  };

  return (
    <div className="w-[90%] mx-auto p-4">
      <h1 className="font-bold text-3xl lg:text-4xl text-center my-8">
        Favorite Movies
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-gray-900 text-white p-6 rounded-lg shadow-lg"
            >
              <img
                src={fav.poster}
                alt={fav.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <h2 className="text-2xl font-bold mt-4">{fav.title}</h2>
              <div className="flex items-center gap-4 mb-2 mt-2">
                <p className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-lg w-20">
                  {fav.releaseYear}
                </p>
                <p className="bg-gray-700 px-3 py-1 rounded-lg w-24">
                  {fav.genre}
                </p>
              </div>

              {/* Rating and Duration */}
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-yellow-500 text-black font-bold px-3 py-1 rounded-lg w-20">
                  {fav.rating.toFixed(1)} / 5
                </span>
                <span className="bg-gray-700 px-3 py-1 rounded-lg w-24">
                  {fav.duration} min
                </span>
              </div>
              <button
                onClick={() => handleDeleteFavorite(fav._id)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg mt-4 w-full cursor-pointer"
              >
                Delete Favorite
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">
            No favorite movies found.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
