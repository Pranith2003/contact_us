import "./App.css";
import Input from "./components/Input";
import Contact from "./components/Contact";
import Map from "./components/Map";
import { MapImageProvider } from "./context/MapImageContext";

function App() {
  return (
    <MapImageProvider>
      <div className="min-h-screen flex flex-col lg:grid lg:grid-rows-2 lg:grid-cols-2 lg:gap-0">
        <div className="p-4 flex-1">
          <Input />
        </div>
        <div className="p-4 flex-1">
          <Map />
        </div>
        <div className="p-4 col-span-2 lg:flex-none flex-1">
          <Contact />
        </div>
      </div>
    </MapImageProvider>
  );
}

export default App;
