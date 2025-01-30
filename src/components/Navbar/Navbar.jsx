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

      {user && (
        <li>
          <NavLink to="/addmovies" className="hover:underline">
            Add Movies
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink to="/favorites" className="hover:underline">
            My Favorites
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-gray-800 bg-opacity-10 lg:px-8 px-4 w-full shadow-md text-white fixed top-0 left-0 z-50">
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
          <div className="relative group">
            {/* User photo */}
            <img
              className="w-12 h-12 rounded-full border-2 border-[#f05122] cursor-pointer"
              src={user?.photoURL || userImg}
              alt="User Profile"
            />
            {/* Dropdown menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-50">
              <div className="p-4">
                {/* Display Name */}
                <p className="text-gray-800 text-center font-bold">
                  {user.displayName}
                </p>
                {/* Logout Button */}
                <button
                  className="w-full mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Logged-out state
          <div className="flex items-center gap-2">
            <Link to="/login">
              <button className="btn bg-[#f05324] text-white border-none hover:bg-[#e04a1f]">
                Login
              </button>
            </Link>
            <span className="text-white">/</span>
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
