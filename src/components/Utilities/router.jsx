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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch("http://localhost:5000/movies"),
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
        loader: () => fetch("http://localhost:5000/movies"),
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
        element: <AddMovies />,
      },
      {
        path: "/details/:id",
        element: <MovieDetails />,
      },
      {
        path: "/favorites",
        element: <FavoriteMovies />,
      },
    ],
  },
]);

export default router;
