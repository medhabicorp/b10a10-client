import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from "../../assets/google-32.png";
import { authContext } from "../AuthProvider/AuthProvider";
import { toast, Toaster } from "react-hot-toast";
import PageTitle from "../PageTitle/PageTitle";
import heroLogo from "../../assets/Hero Movies logo.png";

const Login = () => {
  const { handleGoogleLogin, handleLogin } = useContext(authContext);

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const location = useLocation();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    handleLogin(email, password)
      .then((res) => {
        toast.success("Successfully logged in!");
        form.reset();
        navigate(location.state?.from || "/");
      })
      .catch((err) => {
        const errorMessage =
          "Email and Password don't match. Please try again!";
        setError(errorMessage);
        toast.error(errorMessage);
        form.reset();
      });
  };

  const googleLogingHandler = () => {
    handleGoogleLogin()
      .then((res) => {
        console.log("Google login successful:", res);
        toast.success("Successfully logged in with Google!");
        navigate(location.state?.from || "/");
      })
      .catch(() => {
        console.error("Google login failed:", err);
        toast.error("Failed to log in with Google.");
      });
  };
  return (
    <div>
      <Toaster />
      <PageTitle />
      <div className="hero bg-base-200 min-h-screen ">
        <div className="hero-content flex-col w-[90%] lg:w-[50%]">
          <div className="text-center lg:text-left">
            <img className="w-40 mb-4" src={heroLogo} alt="" />
            <h1 className="text-4xl font-bold text-center">Login now!</h1>
          </div>
          <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl">
            <form
              onSubmit={handleSubmit}
              className="card-body"
              onChange={(e) => setEmail(e.target.value)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-md">
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  placeholder="Place Your Email Address"
                  className="input input-bordered w-full"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-md">
                    Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Type Your Password"
                  className="input input-bordered w-full"
                  name="password"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary bg-[#f05122] hover:bg-[#f26338] border-none text-xl text-white w-full">
                  Login
                </button>
              </div>
            </form>

            {error && <p className="text-red-500 ml-8">{error}</p>}

            <div className="flex flex-col items-center justify-left gap-2 mb-2">
              {" "}
              <h1 className="font-bold text-gray-500 px-8">Or Login With</h1>
              <button
                onClick={googleLogingHandler}
                className=" cursor-pointer"
                href=""
              >
                <img src={googleIcon} alt="" />
              </button>
            </div>

            <h1 className="text-md px-8 mb-4 font-semibold text-gray-500">
              Don't have any account?{" "}
              <Link to="/register">
                <button className="font-bold text-xl text-[#f05122] cursor-pointer">
                  Register
                </button>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {};

export default Login;
