import React, { createContext, useState, useContext } from "react";

const MapImageContext = createContext();

export const MapImageProvider = ({ children }) => {
  const [imageData, setImageData] = useState(null);
  const [location, setLocation] = useState({
    country: "",
    place: "",
    street: "",
    coordinates: null,
  });

  console.log(location);
  return (
    <MapImageContext.Provider
      value={{ imageData, setImageData, location, setLocation }}
    >
      {children}
    </MapImageContext.Provider>
  );
};

export const useMapImage = () => useContext(MapImageContext);
