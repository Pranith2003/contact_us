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
    <>
      <select value={selectedCountry} onChange={handleCountryChange}>
        <option disabled value="">
          --select a country--
        </option>
        {countries.rows.map((item) => (
          <option key={item.id} value={item.co}>
            {item.county.charAt(0).toUpperCase() +
              item.county.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      <select value={selectedPlace} onChange={handlePlaceChange}>
        <option disabled value="">
          --Select the place--
        </option>
        {filteredPlaces.length === 0 ? (
          <option disabled>No places available</option>
        ) : null}
        {filteredPlaces.map((item) => (
          <option key={item.id} value={item.id}>
            {item.place.charAt(0).toUpperCase() +
              item.place.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      <label>Select the</label>
    </>
  );
};

export default Input;
