import React, { createContext, useState, useContext } from "react";


const MapImageContext = createContext();


export const MapImageProvider = ({ children }) => {
  const [imageData, setImageData] = useState(null);

  return (
    <MapImageContext.Provider value={{ imageData, setImageData }}>
      {children}
    </MapImageContext.Provider>
  );
};


export const useMapImage = () => useContext(MapImageContext);
