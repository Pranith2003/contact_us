import React, { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import domtoimage from "dom-to-image";
import axios from "axios";

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

  useEffect(() => {
    const exportMap = () => {
      const mapElement = mapRef.current;
      domtoimage
        .toPng(mapElement)
        .then((imageData) => {

          axios
            .post("https://localhost:3000/api/upload-map-image", {
              image: imageData,
            })
            .then((response) => {
              console.log("Image uploaded successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        })
        .catch((error) => {
          console.error("Error capturing map as image:", error);
        });
    };

    exportMap();
  }, []);

  return (
    <div className="w-3/4 h-[50vh] mx-auto mt-8 rounded-lg shadow-lg overflow-hidden border-4 border-black z-0">

      const mapElement = mapRef.current; // Access the map's DOM element
      domtoimage
        .toPng(mapElement)
        .then((imageData) => {
          // Send the Base64 image to the backend using Axios
          axios
            .post("https://localhost:3000/api/upload-map-image", {
              image: imageData,
            })
            .then((response) => {
              console.log("Image uploaded successfully:", response.data);
            })
            .catch((error) => {
              console.error("Error uploading image:", error);
            });
        })
        .catch((error) => {
          console.error("Error capturing map as image:", error);
        });
    };

    exportMap(); // Call the function to export the map
  }, []); // Empty dependency array ensures this runs once on component mount

  return (
    <div className="w-3/4 h-[50vh] mx-auto mt-8 rounded-lg shadow-lg overflow-hidden border-4 border-black">
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
