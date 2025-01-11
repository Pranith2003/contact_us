import React from "react";
import countries from "../responses/countries.json";
import places from "../responses/places.json";

const Input = () => {
  return (
    <>
      <select name="" id="">
        <option disabled selected>
          --select a country--
        </option>
        {countries.rows.map((item) => (
          <option key={item.id} value={item.id}>
            {item.county.charAt(0).toUpperCase() +
              item.county.slice(1).toLowerCase()}
          </option>
        ))}
      </select>

      {/* Dinesh Write code for remaining */}
    </>
  );
};

export default Input;
