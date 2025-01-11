import React, { useState } from "react";
import countries from "../responses/countries.json";
import places from "../responses/places.json";

const Input = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedPlace("");
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  const filteredPlaces = places.rows.filter(
    (place) => place.co === selectedCountry
  );

  return (
    <form className="w-full max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-xl p-6 md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
      {/* Country Selector */}
      <div className="mb-6 relative">
        <label
          className="block text-base md:text-lg font-medium mb-2 text-gray-700"
          htmlFor="country"
        >
          Country
        </label>
        <div className="relative">
          <select
            id="country"
            value={selectedCountry}
            onChange={handleCountryChange}
            className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-blue-300 appearance-none cursor-pointer text-sm md:text-base"
          >
            <option disabled value="">
              --Select a country--
            </option>
            {countries.rows.map((item) => (
              <option key={item.id} value={item.co}>
                {item.county.charAt(0).toUpperCase() +
                  item.county.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          {/* Dropdown Icon */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Place Selector */}
      <div className="mb-6 relative">
        <label
          className="block text-base md:text-lg font-medium mb-2 text-gray-700"
          htmlFor="place"
        >
          Place
        </label>
        <div className="relative">
          <select
            id="place"
            value={selectedPlace}
            onChange={handlePlaceChange}
            className="w-full p-3 border-2 border-blue-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:ring-blue-300 appearance-none cursor-pointer text-sm md:text-base"
          >
            <option disabled value="">
              --Select the place--
            </option>
            {filteredPlaces.length === 0 ? (
              <option disabled>No places available</option>
            ) : null}
            {filteredPlaces.map((place) => (
              <option key={place.id} value={place.id}>
                {place.place}
              </option>
            ))}
          </select>

          {/* Dropdown Icon */}
          <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Street Address Input */}
      <div className="mb-6">
        <label
          className="block text-base md:text-lg font-medium mb-2 text-gray-700"
          htmlFor="street"
        >
          Street Address
        </label>
        <input
          type="text"
          id="street"
          className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full md:w-auto block text-white text-base md:text-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg px-5 py-3 text-center mt-6"
      >
        Find Street
      </button>
    </form>
  );
};

export default Input;
