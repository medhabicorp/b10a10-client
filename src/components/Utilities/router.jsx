import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../ErrorPage/ErrorPage";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import AllMovies from "../AllMovies/AllMovies";
import Review from "../Review/Review";
import Pricing from "../Pricing/Pricing";
import AddMovies from "../AddMovies/AddMovies";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import MovieDetails from "../MovieDetails/MovieDetails";
import FavoriteMovies from "../FavoriteMovies/FavoriteMovies";
import UpdateMovie from "../UpdateMovie/UpdateMovie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () =>
          fetch("https://b10a10-movie-server.vercel.app/movies?limit=6"),
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/allmovies",
        element: <AllMovies />,
        loader: () => fetch("https://b10a10-movie-server.vercel.app/movies"),
      },
      {
        path: "/review",
        element: <Review />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/addmovies",
        element: (
          <PrivateRoute>
            <AddMovies />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <MovieDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://b10a10-movie-server.vercel.app/movies/${params.id}`),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoute>
            <UpdateMovie />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://b10a10-movie-server.vercel.app/movies/${params.id}`),
      },
      {
        path: "/favorites",
        element: (
          <PrivateRoute>
            <FavoriteMovies />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
