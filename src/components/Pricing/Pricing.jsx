import React from "react";
import PropTypes from "prop-types";
import { FaCheckCircle, FaTimesCircle, FaFire } from "react-icons/fa";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "$7.99",
      features: {
        hd: false,
        hdr: false,
        laptop: true,
        mobile: true,
        screens: 1,
      },
      isPopular: false,
    },
    {
      name: "Standard",
      price: "$10.99",
      features: {
        hd: true,
        hdr: false,
        laptop: true,
        mobile: true,
        screens: 2,
      },
      isPopular: false,
    },
    {
      name: "Premium",
      price: "$13.99",
      features: {
        hd: true,
        hdr: true,
        laptop: true,
        mobile: true,
        screens: 4,
      },
      isPopular: true,
    },
  ];

  return (
    <div className="bg-black text-white py-12">
      <div className="text-center">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4">
          Choose the plan that’s right for you
        </h1>
        <p className="text-lg text-gray-300">
          Unlimited movies and TV shows. Watch all you want ad-free.
        </p>
        <p className="text-lg text-gray-300">
          Change or cancel your plan anytime.
        </p>
      </div>
      <div className="flex justify-center mt-8">
        <button className="bg-red-600 text-white px-6 py-2 rounded-md text-lg hover:bg-red-700">
          Start your free month
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[90%] mx-auto mt-12">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg border-2 ${
              plan.isPopular
                ? "border-red-600 bg-red-900"
                : "border-gray-600 bg-gray-800"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-between">
              {plan.name}
              {plan.isPopular && (
                <span className="text-sm bg-red-600 px-2 py-1 rounded-lg flex items-center">
                  <FaFire className="mr-1" />
                  Popular
                </span>
              )}
            </h2>
            <p className="text-3xl font-bold mb-6">{plan.price}</p>
            <ul className="space-y-4">
              <li className="flex items-center">
                {plan.features.hd ? (
                  <FaCheckCircle className="text-green-500 mr-2" size={20} />
                ) : (
                  <FaTimesCircle className="text-red-500 mr-2" size={20} />
                )}
                HD available
              </li>
              <li className="flex items-center">
                {plan.features.hdr ? (
                  <FaCheckCircle className="text-green-500 mr-2" size={20} />
                ) : (
                  <FaTimesCircle className="text-red-500 mr-2" size={20} />
                )}
                4K + HDR available
              </li>
              <li className="flex items-center">
                {plan.features.laptop ? (
                  <FaCheckCircle className="text-green-500 mr-2" size={20} />
                ) : (
                  <FaTimesCircle className="text-red-500 mr-2" size={20} />
                )}
                Watch on your laptop and TV
              </li>
              <li className="flex items-center">
                {plan.features.mobile ? (
                  <FaCheckCircle className="text-green-500 mr-2" size={20} />
                ) : (
                  <FaTimesCircle className="text-red-500 mr-2" size={20} />
                )}
                Watch on your mobile phone and tablet
              </li>
              <li className="flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" size={20} />
                Screens you can watch on at the same time:{" "}
                {plan.features.screens}
              </li>
            </ul>
            <button className="mt-6 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700">
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Pricing.propTypes = {};

export default Pricing;
