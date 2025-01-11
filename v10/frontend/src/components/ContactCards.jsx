import React, { useState } from "react";
import Email from "../assets/email.png";
import Phone from "../assets/phone.png";

const ContactCards = ({ name, value }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [message, setMessage] = useState("");

  const toggleModal = (row = null) => {
    setIsModalOpen(!isModalOpen);
    setSelectedRow(row); // Store the clicked row's data in state
  };
  const handleSendEmail = () => {
    alert(`Email sent to: ${selectedRow?.email}\nMessage: ${message}`);
    setMessage(""); // Reset the input
    setIsModalOpen(false); // Close the modal
    setSelectedRow(null); // Reset the selected row
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
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
                        onClick={handleBackgroundClick}
                      >
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                          {/* Close button */}
                          <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-black transition"
                            onClick={toggleModal}
                          >
                            &times;
                          </button>
                          <h2 className="text-xl font-bold mb-4">
                            Name: {selectedRow.name}
                          </h2>
                          <p className="mb-4">
                            Email To:{" "}
                            <span className="font-semibold">
                              {selectedRow.email}
                            </span>
                          </p>
                          <p className="mb-2">
                            Would you like to add anything?
                          </p>
                          <textarea
                            placeholder="Type your message..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-4 resize-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                          />
                          <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                            onClick={handleSendEmail}
                          >
                            Send Email
                          </button>
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
