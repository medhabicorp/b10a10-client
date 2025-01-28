import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import movieLogo from "../../assets/Hero Movies logo.png";
import { authContext } from "../AuthProvider/AuthProvider";
import userImg from "../../assets/user-profile-50.png";
const Navbar = (props) => {
  const { user, handleLogout } = useContext(authContext);
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
      <div className="navbar-end">
        {user ? (
          // Logged-in state
          <div className="flex justify-center items-center gap-4">
            {/* User photo with hover tooltip for displayName */}
            <div className="relative group">
              <img
                className="w-12 h-12 rounded-full border-2 border-[#f05122] cursor-pointer"
                src={user?.photoURL || userImg}
                alt="User Profile"
              />
              {/* Tooltip for displayName */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {user.displayName}
              </div>
            </div>
            {/* Logout button */}
            <button
              className="btn bg-red-600 text-white hover:bg-orange-600 border-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          // Logged-out state
          <div className="flex items-center gap-4">
            <Link to="/login">
              <button className="btn bg-[#f05324] text-white border-none hover:bg-[#e04a1f]">
                Login
              </button>
            </Link>
            <span className="text-gray-600">or</span>
            <Link to="/register">
              <button className="btn bg-[#f05324] text-white border-none hover:bg-[#e04a1f]">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
