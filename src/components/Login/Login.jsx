import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/google-32.png";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import PageTitle from "../PageTitle/PageTitle";
import heroLogo from "../../assets/Hero Movies logo.png";

const Login = () => {
  const { handleGoogleLogin, handleLogin } = useContext(authContext);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;

    handleLogin(email, password)
      .then(() => {
        toast.success("Successfully logged in!");
        reset();
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        const errorMessage =
          "Email and Password don't match. Please try again!";
        setError(errorMessage);
        toast.error(errorMessage);
        reset();
      });
  };

  const googleLoginHandler = () => {
    handleGoogleLogin()
      .then(() => {
        toast.success("Successfully logged in with Google!");
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        console.error("Google login failed:", err);
        toast.error("Failed to log in with Google.");
      });
  };

  return (
    <div>
      <Toaster />
      <PageTitle />
      <div className="hero min-h-screen bg-gradient-to-r from-[#FF0054] to-[#00DBFF] flex items-center justify-center">
        <div className="card w-full max-w-md bg-white shadow-lg rounded-lg p-4 lg:p-8 ">
          <div className="text-center mb-6">
            <img className="w-24 mx-auto mb-4" src={heroLogo} alt="Hero Logo" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome!</h1>
            <p className="text-gray-600">Please login to your account</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md">
                Login
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          <div className="flex flex-col items-center mt-6">
            <h1 className="font-bold text-gray-500 mb-2">Or Login With</h1>
            <button
              onClick={googleLoginHandler}
              className="flex items-center space-x-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100  cursor-pointer"
            >
              <img
                src={googleIcon}
                alt="Google Login Icon"
                className="w-5 h-5"
              />
              <span className="text-gray-700">Google</span>
            </button>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/register">
              <span className="text-indigo-600 font-semibold cursor-pointer">
                Register
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
