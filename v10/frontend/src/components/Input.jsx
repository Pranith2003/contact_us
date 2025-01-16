import React, { useState, useMemo } from "react";
import { useMapImage } from "../context/MapImageContext";
import countries from "../responses/countries.json";
import places from "../responses/places.json";

const Input = () => {
  const [toggleOption, setToggleOption] = useState("places");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [street, setStreet] = useState("");
  const { setLocation } = useMapImage();

  const resetFormStates = () => {
    setLat("");
    setLng("");
    setSelectedCountry("");
    setSelectedPlace("");
    setStreet("");
  };

  const getCoordinates = async (country, place, street = "") => {
    try {
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${street}, ${place}, ${country}&apiKey=427d2edff9034444a6a4f11250059cf4`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const { lat, lon } = data.features[0].properties;
        return [lat, lon];
      } else {
        throw new Error("No coordinates found for the selected location.");
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      alert("Failed to fetch coordinates. Please try again.");
      return null;
    }
  };

  const handleCountryChange = async (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedPlace(""); // Reset place when country changes
    setStreet(""); // Reset street when country changes

    // Fetch coordinates for the country
    const coordinates = await getCoordinates(country, "", "");
    if (coordinates) {
      setLocation({
        country,
        place: "",
        street: "",
        coordinates,
      });
    }
  };

  const handlePlaceChange = async (e) => {
    const place = e.target.value;
    setSelectedPlace(place);

    // Fetch coordinates for country and place
    const coordinates = await getCoordinates(selectedCountry, place, "");
    if (coordinates) {
      setLocation({
        country: selectedCountry,
        place,
        street: "",
        coordinates,
      });
    }
  };

  const handleStreetChange = async (e) => {
    const street = e.target.value;
    setStreet(street);

    // Fetch coordinates for country, place, and street
    const coordinates = await getCoordinates(
      selectedCountry,
      selectedPlace,
      street
    );
    if (coordinates) {
      setLocation({
        country: selectedCountry,
        place: selectedPlace,
        street,
        coordinates,
      });
    }
  };

  const handleLatLongSubmit = () => {
    if (!lat || !lng) {
      alert("Please enter both latitude and longitude.");
      return;
    }
    setLocation({
      country: null,
      place: null,
      street: null,
      coordinates: [parseFloat(lat), parseFloat(lng)],
    });
    alert(`Latitude: ${lat}, Longitude: ${lng}`);
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
            onClick={() => {
              setToggleOption("places");
              resetFormStates();
            }}
            className={`px-6 py-2 rounded-full text-sm font-medium transition shadow-lg ${
              toggleOption === "places"
                ? "bg-gradient-to-r from-blue-500 to-blue-700 text-white ring-2 ring-blue-400"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Select by Places
          </button>
          <button
            onClick={() => {
              setToggleOption("latlong");
              resetFormStates();
            }}
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
          <form className="w-full h-full flex flex-col justify-center">
            {/* Country Selector */}
            <div className="mb-6 relative">
              <label
                className="block text-base md:text-lg font-medium mb-2 text-gray-700"
                htmlFor="country"
              >
                Country
              </label>
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

            {/* Place Selector */}
            <div className="mb-6 relative">
              <label
                className="block text-base md:text-lg font-medium mb-2 text-gray-700"
                htmlFor="place"
              >
                Place
              </label>
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
                    {place.place
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </option>
                ))}
              </select>
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
                onChange={handleStreetChange}
                className="w-full p-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
                placeholder="Enter street address"
              />
            </div>
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
