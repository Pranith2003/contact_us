import React, { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMap,
} from "react-leaflet";
import domtoimage from "dom-to-image";
import { useMapImage } from "../context/MapImageContext";

const Map = () => {
  const mapRef = useRef();
  const { location, setImageData } = useMapImage(); // Access location data and context function

  useEffect(() => {
    const captureMapImage = () => {
      const mapElement = mapRef.current;

      if (!mapElement) {
        console.error("Map element not found.");
        return;
      }
      const tileLoadCheck = setInterval(() => {
        const tiles = mapElement.querySelectorAll(".leaflet-tile");
        const loadingTiles = Array.from(tiles).some((tile) => !tile.complete);

        if (!loadingTiles) {
          clearInterval(tileLoadCheck);

          domtoimage
            .toPng(mapElement)
            .then((imageData) => {
              setImageData(imageData);
              console.log("Map image captured and saved to context!");
            })
            .catch((error) => {
              console.error("Error capturing map as image:", error);
            });
        }
      }, 100);
    };

    captureMapImage();
  }, [setImageData]);

  // Dynamically update the map based on location data
  const dynamicCoordinates = location.coordinates || [48.1500327, 11.5753989]; // Default center (Munich coordinates) if no location is provided
  const polygonCoordinates = location.polygon || []; // Use a polygon if provided, else empty

  return (
    <div
      ref={mapRef}
      className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg shadow-lg overflow-hidden z-0"
    >
      <MapContainer
        center={dynamicCoordinates}
        zoom={10}
        className="h-full w-full"
        key={dynamicCoordinates.toString()} // Ensure the map resets on location change
      >
        {/* Geoapify Tile Layer */}
        <TileLayer
          url="https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=427d2edff9034444a6a4f11250059cf4"
          attribution='Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a> | <a href="https://openmaptiles.org/" target="_blank">© OpenMapTiles</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap</a> contributors'
          maxZoom={20}
        />
        {polygonCoordinates.length > 0 && (
          <Polygon positions={polygonCoordinates} color="blue" />
        )}
        <Marker position={dynamicCoordinates} />
      </MapContainer>
    </div>
  );
};

export default Map;
