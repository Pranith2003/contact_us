import React, { useState } from "react";
import axios from "axios";
import { useMapImage } from "../../context/MapImageContext";

const EmailModal = ({ isOpen, onClose, selectedRow }) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const { imageData } = useMapImage();

  const handleSendEmail = async () => {
    try {
      if (!selectedRow) {
        alert("No contact selected.");
        return;
      }

      if (!selectedRow.email) {
        alert(
          "This contact does not have an email. Please Contact using Phone..."
        );
        setIsPhoneModalOpen(true);
        onClose();
        return;
      }

      if (!imageData) {
        alert("Required map image data is missing.");
        return;
      }

      setIsLoading(true);
      const emailData = {
        name: selectedRow.name,
        email: selectedRow.email,
        code: selectedRow.code,
        message: message.trim(),
        mapImage: imageData,
      };

      const response = await axios.post(
        "http://localhost:3000/send-email",
        emailData
      );

      alert(`Email sent to: ${selectedRow?.email}`);
      setMessage("");
      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const formatPhoneNumber = (phone) => {
    if (!phone) return "---";
    const cleaned = ("" + phone).replace(/\D/g, ""); 
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `${match[1]}.${match[2]}.${match[3]}`; 
    }
    return phone; 
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        id="modalBackground"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
        onClick={onClose}
      >
        <div
          className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-gray-600 hover:text-black transition duration-200"
            onClick={onClose}
          >
            &times;
          </button>

          <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Contact Information
          </h1>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-md">
            <p className="text-lg font-semibold text-blue-700">Email</p>
            <p className="text-xl lowercase font-bold text-gray-900">
              {selectedRow.email || "---"}
            </p>
          </div>

          {/* Details Section */}
          <div className="flex justify-between mb-2">
            <span className="text-gray-500">Contact Name:</span>
            <span className="font-medium">{selectedRow.contact || "---"}</span>
          </div>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Contact Type:</span>
              <span className="font-medium">
                {selectedRow.contact_type || "---"}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Code:</span>
              <span className="font-medium">{selectedRow.code || "---"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Phone:</span>
              <span className="font-medium">{formatPhoneNumber(selectedRow.phone || "---")}</span>
            </div>
            {selectedRow.phone_ext && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Phone Ext:</span>
                <span className="font-medium">
                  {selectedRow.phone_ext || "---"}
                </span>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Cell:</span>
              <span className="font-medium">{selectedRow.cell || "---"}</span>
            </div>

            {/* <div className="flex justify-between mb-2">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-blue-600 underline">
                {selectedRow.email || "---"}
              </span>
            </div> */}
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Description:</span>
              <span className="font-medium">
                {selectedRow.description || "---"}
              </span>
            </div>
          </div>

          {/* Message Section */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-600 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows={4}
            />
          </div>

          {/* Footer Section */}
          <div className="flex justify-end">
            <button
              className={`px-4 py-2 rounded-md shadow transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
              onClick={handleSendEmail}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailModal;
