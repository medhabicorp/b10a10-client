import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import PageTitle from "../PageTitle/PageTitle";
import heroLogo from "../../assets/Hero Movies logo.png";

const Registration = () => {
  const { handleRegister, manageProfile } = useContext(authContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const conPassword = e.target.conPassword.value;
    if (password.length < 6) {
      setError("Password must contain at least 6 characters");
      return;
    }
    if (password !== conPassword) {
      setError("Warning: Passwords don't match!");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Warning: Password must contain at least one lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Warning: Password must contain at least one uppercase letter");
      return;
    }

    handleRegister(email, password)
      .then(() => {
        toast.success("Your Account Successfully Registered!");
        manageProfile(name, image);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setError(
            "This email is already registered. Please use a different email."
          );
        } else {
          setError("An error occurred during registration. Please try again.");
        }
        console.error("Registration Error:", error);
      });
  };
  return (
    <div className="hero bg-gradient-to-r from-orange-400 to-red-600 min-h-screen  ">
      <PageTitle />
      <div className="hero-content flex-col w-[90%] lg:w-[50%]">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
          <div className="text-center lg:text-left flex flex-col items-center">
            <img className="w-36 my-2" src={heroLogo} alt="" />
            <h1 className="font-bold text-2xl lg:text-3xl text-center">
              Register Now!
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                name="name"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                name="email"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">Image</span>
              </label>
              <input
                type="text"
                placeholder="Place photo URL"
                className="input input-bordered w-full"
                name="image"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full"
                name="password"
                required
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-xs absolute right-2 bottom-2"
              >
                {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </button>
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text font-bold">Confirm Password</span>
              </label>
              <input
                type={showPassword2 ? "text" : "password"}
                placeholder="Confirm Password"
                className="input input-bordered w-full"
                name="conPassword"
                required
              />
              <button
                onClick={() => setShowPassword2(!showPassword2)}
                className="btn btn-xs absolute right-2 bottom-2"
              >
                {showPassword2 ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary bg-[#f05122] hover:bg-[#f26338] border-none text-xl text-white w-full">
                Register
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 ml-8">{error}</p>}

          <h1 className="text-md px-8 mb-4 font-semibold text-gray-500">
            Already have an account?{" "}
            <Link to="/login">
              <button className="font-bold text-xl text-[#f05122] cursor-pointer">
                Login
              </button>
            </Link>
          </h1>
        </div>
      </div>
      <div>
        <Toaster />
      </div>
    </div>
  );
};

Registration.propTypes = {};

export default Registration;
