import React, { useState } from "react";
import emergencyData from "../responses/emergency.json";
import planData from "../responses/plan.json";
import ContactCards from "./ContactCards";

const tabs = [
  { id: "Emergency", label: "Emergency" },
  { id: "Plan", label: "Plan & Design" },
];

const Contact = () => {
  const [activeTab, setActiveTab] = useState("Emergency");

  const getActiveData = () => {
    switch (activeTab) {
      case "Emergency":
        return emergencyData;
      case "Plan":
        return planData;
      default:
        return [];
    }
  };

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="flex items-center justify-start mb-6">
        <div className="bg-gray-200 p-1 rounded-full flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
                  : "bg-transparent text-gray-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="overflow-x-auto">
        <ContactCards name={activeTab} value={getActiveData()} />
      </div>
    </div>
  );
};

export default Contact;
