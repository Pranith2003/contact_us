import React, { useState } from "react";
import axios from "axios";

const PhoneModal = ({ isOpen, onClose, selectedRow }) => {
  const [message, setMessage] = useState(""); // State for textarea input
  const [isLoading, setIsLoading] = useState(false); // State for loading

  const handleSendData = async () => {
    try {
      if (!selectedRow) {
        alert("No contact selected.");
        return;
      }

      setIsLoading(true);

      const dataToSend = {
        name: selectedRow.name,
        phone: selectedRow.phone,
        message: message.trim(),
      };

      console.log("Sending data:", dataToSend);

      // Replace with your API endpoint
      const response = await axios.post(
        "http://localhost:3000/send-phone-message",
        dataToSend
      );

      console.log("Data sent successfully:", response.data);

      // Success feedback
      alert(`Message sent successfully to: ${selectedRow.phone}`);
      setMessage(""); // Clear message input
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send the message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const formatPhoneNumber = (phone) => {
    if (!phone) return "---";
    const cleaned = ("" + phone).replace(/\D/g, ""); // Remove non-numeric characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}`; // Format as 123.456.7890
    }
    return phone; // Return the original input if it doesn't match the expected pattern
  };

  if (!isOpen) return null;

  return (
    <div
      id="modalBackground"
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Contact Information
        </h1>
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black transition duration-200"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Highlighted Phone Section */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-md">
          <p className="text-lg font-semibold text-blue-700">Phone Number:</p>
          <p className="text-2xl font-bold text-gray-900">
            {formatPhoneNumber(selectedRow.phone || "---")}
          </p>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-500">Contact Name</span>
          <span className="font-medium">{selectedRow.contact || "---"}</span>
        </div>

        {/* Details Section */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Contact Type:</span>
            <span className="font-medium">
              {selectedRow.contact_type || "---"}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Phone Ext:</span>
            <span className="font-medium">
              {selectedRow.phone_ext || "---"}
            </span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Cell:</span>
            <span className="font-medium">{selectedRow.cell || "---"}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Contact Name:</span>
            <span className="font-medium">{selectedRow.contact || "---"}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Description:</span>
            <span className="font-medium">
              {selectedRow.description || "---"}
            </span>
          </div>
        </div>

        {/* Message Section */}
        <textarea
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
          rows={4}
        />
        <div className="flex justify-end gap-2">
          <button
            className={`px-4 py-2 rounded-md shadow ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "btn-gradient"
            } transition`}
            onClick={handleSendData}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
