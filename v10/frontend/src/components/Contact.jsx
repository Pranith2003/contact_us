import React, { useState } from "react";
import emergency from "../responses/emergency.json";
import plan from "../responses/plan.json";
import ContactCards from "./ContactCards";

const Contact = () => {
  const [activeTab, setActivetab] = useState("Emergency");
  return (
    <>
      <div className="flex gap-4 justify-center my-4">
        <button
          onClick={() => setActivetab("Emergency")}
          className={`px-4 py-2 rounded ${
            activeTab === "Emergency"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Emergency
        </button>
        <button
          onClick={() => setActivetab("Plan")}
          className={`px-4 py-2 rounded ${
            activeTab === "Plan"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          Plan & Design
        </button>
      </div>
      {activeTab === "Emergency" && (
        <ContactCards name="Emergency" value={emergency} />
      )}
      {activeTab === "Plan" && <ContactCards name="Plan" value={plan} />}
    </>
  );
};

export default Contact;
