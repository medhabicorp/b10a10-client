import React from "react";
import PropTypes from "prop-types";
import notFound from "../../assets/movie not found.jpg";

const ErrorPage = (props) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <img
        className="lg:w-1/2 lg:h-1/2 md:w-1/2 md:h-1/2 sm:w-2/3 sm:h-2/3 w-2/3 h-2/3"
        src={notFound}
        alt=""
      />
    </div>
  );
};

ErrorPage.propTypes = {};

export default ErrorPage;
