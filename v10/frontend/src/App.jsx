import "./App.css";
import Input from "./components/Input";
import Contact from "./components/Contact";
import Map from "./components/Map";

function App() {
  return (

    <div className="flex flex-col min-h-screen">
      
      <div className="flex flex-1">
        <div className="w-1/2 p-4 mt-8">
          <Input />
        </div>
        <div className="w-1/2 p-4">
          <Map />
        </div>
      </div>

  
      <div className="p-4 ">
        <Contact />
      </div>
    </div>
  );
}

export default App;
