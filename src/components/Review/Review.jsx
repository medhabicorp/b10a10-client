import React from "react";
import PropTypes from "prop-types";
import reviewImg from "../../assets/reviewImg.png";
import movieImg1 from "../../assets/movie-6.jpg";
import movieImg2 from "../../assets/movie-5.jpg";
import movieImg3 from "../../assets/movie-7.jpg";
import movieImg4 from "../../assets/movie-2.jpg";
import PageTitle from "../PageTitle/PageTitle";

const Review = () => {
  const movies = [
    {
      img: movieImg1,
      date: "28 Jan, 2022",
      title: "The Movie We don't Believe",
      description: "Truth Hides in the Shadows",
    },
    {
      img: movieImg2,
      date: "31 Mar, 2023",
      title: "Paradise on Earth",
      description: "Life is nothing but what we take it as.",
    },
    {
      img: movieImg3,
      date: "20 April, 2024",
      title: "Silent: Secrets Never Revealed ",
      description: "Not keeping Secrets is a Horror of Everyday life.",
    },
    {
      img: movieImg4,
      date: "1 Dec, 2020",
      title: "Don't Enter Every Building",
      description: "Entering Secret Building is the foolish job. ",
    },
  ];

  return (
    <div className="">
      <div
        className="w-full h-[300px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${reviewImg})`,
        }}
      ></div>

      <h1 className="font-bold text-xl lg:text-2xl w-[75%] lg:w-[30%] mx-auto my-2 lg:my-4 text-center border-3 py-2 rounded-xl border-orange-500">
        Our Latest Movie Reviews
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-[90%] mx-auto">
        {movies?.map((movie, index) => (
          <div key={index} className="text-center">
            <img
              src={movie.img}
              alt="Movie"
              className="w-full h-fit object-cover rounded-lg"
            />
            <p className="text-gray-500 text-sm mt-2">{movie.date}</p>
            <h2 className="text-lg font-bold mt-1">{movie.title}</h2>
            <p className="text-gray-500 text-sm">{movie.description}</p>
            <button
              className="my-4 btn border-2  border-amber-300
            "
            >
              Read Full Review
            </button>
          </div>
        ))}
      </div>
      <PageTitle />
    </div>
  );
};

Review.propTypes = {};

export default Review;
