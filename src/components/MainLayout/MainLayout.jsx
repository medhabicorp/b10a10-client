import React from "react";
import PropTypes from "prop-types";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";

const MainLayout = (props) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="pt-[108px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

MainLayout.propTypes = {};

export default MainLayout;
