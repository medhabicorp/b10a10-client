import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import movieLogo from "../../assets/Hero Movies logo.png";
const Navbar = (props) => {
  const links = (
    <>
      <li>
        <NavLink to="/" className="hover:underline">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/allmovies" className="hover:underline">
          All Movies
        </NavLink>
      </li>
      <li>
        <NavLink to="/pricing" className="hover:underline">
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink to="/review" className="hover:underline">
          Review
        </NavLink>
      </li>

      <li>
        <NavLink to="/addmovies" className="hover:underline">
          Add Movies
        </NavLink>
      </li>

      <li>
        <NavLink to="/favorites" className="hover:underline">
          My Favorites
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-gray-800 bg-opacity-10 lg:px-8 lg:py-6 px-4 py-4 w-full shadow-md text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-gray-800 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <NavLink className=" font-bold text-xl lg:text-3xl py-2 px-2 text-center lg:px-6">
          <img className="w-28 md:w-32 lg:w-36" src={movieLogo} alt="" />
        </NavLink>
      </div>
      <div className="navbar-center  hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-bold text-xl gap-3 animate__animated animate__slideInDown">
          {links}
        </ul>
      </div>
      <div className="navbar-end ">
        <Link to="/login">
          {" "}
          <button className="btn btn-primary bg-[#f05324] border-none">
            Login
          </button>
        </Link>
        <h1 className="mx-2">or</h1>
        <Link to="/register">
          {" "}
          <button className="btn btn-primary bg-[#f05324] border-none">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
