import React, { useEffect } from "react";
import PropTypes from "prop-types";

const PageTitle = () => {
  const routeTitles = {
    "/": "Home | HeroMovies",
    "/login": "Login | HeroMovies",
    "/register": "Register | HeroMovies",
    "/addmovies": "Add Movies | HeroMovies",
    "/allmovies": "All Movies | HeroMovies",
    "/review": "Review | HeroMovies",
    "/pricing": "Plans | HeroMovies",
    "/favorites": "Favorite Movies | HeroMovies",
    "/details/:id": "MovieDetails | HeroMovies",
  };

  useEffect(() => {
    // Match the title to the current route
    const defaultTitle = "Hero Movies";
    const title = routeTitles[location.pathname] || defaultTitle;
    document.title = title;
  }, [location]);

  return null; // This component does not render anything
};

PageTitle.propTypes = {};

export default PageTitle;
