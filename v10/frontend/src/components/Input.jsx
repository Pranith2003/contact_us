import React, { useState, useMemo } from "react";
import countries from "../responses/countries.json";
import places from "../responses/places.json";

const Input = () => {
  const [toggleOption, setToggleOption] = useState("places");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [street, setStreet] = useState("");

  const handleToggleChange = (option) => {
    setToggleOption(option);
    resetFormStates();
  };

  const resetFormStates = () => {
    setLat("");
    setLng("");
    setSelectedCountry("");
    setSelectedPlace("");
    setStreet("");
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedPlace("");
  };

  const handlePlaceChange = (e) => {
    setSelectedPlace(e.target.value);
  };

  const handleLatLongSubmit = () => {
    if (!lat || !lng) {
      alert("Please enter both latitude and longitude.");
      return;
    }
    alert(`Latitude: ${lat}, Longitude: ${lng}`);
  };

  const handlePlaceSubmit = (e) => {
    e.preventDefault();
    if (!selectedCountry || !selectedPlace || !street) {
      alert("Please fill out all fields.");
      return;
    }
    alert(
      `Country: ${selectedCountry}, Place: ${selectedPlace}, Street: ${street}`
    );
  };

  const filteredPlaces = useMemo(() => {
    return places.rows.filter((place) => place.co === selectedCountry);
  }, [selectedCountry]);

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Contact Us
        </h1>
      </div>
      <div className="w-full max-w-lg mx-auto bg-white border border-gray-300 rounded-lg shadow-xl p-6">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 space-x-2">
          <button
            onClick={() => handleToggleChange("places")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition shadow-lg ${
              toggleOption === "places"
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white ring-2 ring-blue-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Select by Places
          </button>
          <button
            onClick={() => handleToggleChange("latlong")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition shadow-lg ${
              toggleOption === "latlong"
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white ring-2 ring-blue-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Latitude & Longitude
          </button>
        </div>

        {/* Select by Places Form */}
        {toggleOption === "places" && (
          <form
            onSubmit={handlePlaceSubmit}
            className="w-full h-full flex flex-col justify-center"
          >
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
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                placeholder="Enter street address"
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
        )}

        {/* Latitude & Longitude Form */}
        {toggleOption === "latlong" && (
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label
                htmlFor="latitude"
                className="block text-gray-700 font-medium"
              >
                Latitude
              </label>
              <input
                type="number"
                id="latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                placeholder="Enter latitude"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="longitude"
                className="block text-gray-700 font-medium"
              >
                Longitude
              </label>
              <input
                type="number"
                id="longitude"
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                placeholder="Enter longitude"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleLatLongSubmit}
              className="px-4 py-2 text-white rounded-md shadow bg-gradient-to-r from-blue-500 to-blue-700 ring-2 ring-blue-400"
            >
              Submit Coordinates
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Input;
