import React, { useState } from "react";
import Email from "../assets/email.png";
import Phone from "../assets/phone.png";
import axios from "axios";
import { useMapImage } from "../context/MapImageContext";

const ContactCards = ({ name, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const { imageData } = useMapImage(); // Access imageData from the context at the top level

  const toggleModal = (row = null) => {
    setIsModalOpen(!isModalOpen);
    setSelectedRow(row);
  };

  const handleSendEmail = async () => {
    try {
      console.log("Button clicked");

      if (!selectedRow) {
        console.error("No selected row to send email.");
        return;
      }

      if (!imageData) {
        alert("Map image data is not available.");
        return;
      }

      setIsLoading(true); // Start loading

      const emailData = {
        name: selectedRow.name,
        email: selectedRow.email,
        code: selectedRow.code,
        message: message.trim(),
        mapImage: imageData, // Access imageData from the context
      };

      console.log("Email Data:", emailData);

      const response = await axios.post(
        "http://localhost:3000/send-email",
        emailData
      );

      console.log("Email sent successfully:", response.data);

      // Success feedback
      alert(`Email sent to: ${selectedRow?.email}\nMessage: ${message}`);

      // Close the modal and clear state
      setMessage(""); // Clear message input
      setIsModalOpen(false); // Explicitly close the modal
      setSelectedRow(null); // Clear the selected row
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleBackgroundClick = (e) => {
    if (e.target.id === "modalBackground") {
      setIsModalOpen(false); // Close modal if clicking on the background
      setSelectedRow(null);
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="text-xs uppercase bg-gray-100 text-gray-700 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Contact Type
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Code
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Name
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Phone
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Email
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Comments
              </th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Contact Me
              </th>
            </tr>
          </thead>
          <tbody>
            {value.rows.map((item, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-50 transition duration-200 border-b border-gray-200"
              >
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.contact_type}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.code}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.name}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.phone}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.contact}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.email.replace(/@/g, "[at]").replace(/\./g, "[dot]")}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.comments}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.description}
                </td>
                <td className="px-6 py-3">
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      className="p-1 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => toggleModal(item)}
                    >
                      <img src={Email} alt="Email" className="w-6 h-6" />
                    </button>
                    {isModalOpen && selectedRow && (
                      <div
                        id="modalBackground"
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50"
                        onClick={handleBackgroundClick}
                      >
                        <div
                          className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg relative animate-fade-in"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {/* Close Button */}
                          <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-black transition duration-200"
                            onClick={toggleModal}
                          >
                            &times;
                          </button>

                          <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            Contact {selectedRow.name}
                          </h2>

                          <p className="mb-4 text-gray-700">
                            Email To:{" "}
                            <span className="font-semibold text-gray-900">
                              {selectedRow.email}
                            </span>
                          </p>
                          <p className="mb-2 text-gray-600">
                            Would you like to add anything?
                          </p>
                          <textarea
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            rows={4}
                          />

                          <div className="flex justify-end">
                            <button
                              className={`px-4 py-2 rounded-md shadow transition ${
                                isLoading
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 text-white hover:bg-blue-600"
                              }`}
                              onClick={handleSendEmail}
                              disabled={isLoading}
                            >
                              {isLoading ? "Sending..." : "Send Email"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    <button className="p-1 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform">
                      <img src={Phone} alt="Phone" className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ContactCards;
