import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Polygon, useMap } from "react-leaflet";
import domtoimage from "dom-to-image";
import { useMapImage } from "../context/MapImageContext";

const coordinates = [
  [-113.543159092464, 37.1084767228141],
  [-113.543393943663, 37.1085098346398],
  [-113.54360046834, 37.1086051763421],
  [-113.543753756573, 37.1087512483046],
  [-113.543804340828, 37.1088379872999],
  [-113.543835319538, 37.1089304320928],
  [-113.543845751431, 37.1090257737952],
  [-113.543835319538, 37.1091211154975],
  [-113.543804340828, 37.1092135602904],
  [-113.543753756573, 37.1093002992857],
  [-113.54360046834, 37.1094463712482],
  [-113.543393943663, 37.1095417129505],
  [-113.543159092464, 37.1095748247763],
  [-113.540533672597, 37.1095748247763],
  [-113.540414435518, 37.1095664834581],
  [-113.540190343113, 37.1095012658928],
  [-113.540092296721, 37.1094463712482],
  [-113.539939008488, 37.1093002992857],
  [-113.539888424233, 37.1092135602904],
  [-113.539857445523, 37.1091211154975],
  [-113.53984701363, 37.1090257737952],
  [-113.539857445523, 37.1089304320928],
  [-113.539888424233, 37.1088379872999],
  [-113.539939008488, 37.1087512483046],
  [-113.540092296721, 37.1086051763421],
  [-113.540298821398, 37.1085098346398],
  [-113.540533672597, 37.1084767228141],
].map(([lng, lat]) => [lat, lng]);

const Map = () => {
  const mapRef = useRef();
  const { setImageData } = useMapImage();

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

  return (
    <div
      ref={mapRef}
      className="w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] rounded-lg shadow-lg overflow-hidden z-0"
    >
      <MapContainer
        center={[37.1089, -113.542]}
        zoom={17}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Polygon positions={coordinates} color="blue" />
      </MapContainer>
    </div>
  );
};

export default Map;
