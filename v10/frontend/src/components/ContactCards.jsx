import React, { useState } from "react";
import Email from "../assets/email.png";
import Phone from "../assets/phone.png";
import EmailModal from "./Modals/EmailModal";
import PhoneModal from "./Modals/PhoneModal";

const ContactCards = ({ value }) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleEmailClick = (row) => {
    setSelectedRow(row);
    setIsEmailModalOpen(true);
  };

  const handlePhoneClick = (row) => {
    setSelectedRow(row);
    setIsPhoneModalOpen(true);
  };

  const closeModals = () => {
    setIsEmailModalOpen(false);
    setIsPhoneModalOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="text-xs  bg-gray-100 text-gray-700 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Contact Type</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Code</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Name</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Phone</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Contact</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Email</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Comments</th>
              <th scope="col" className="px-6 py-3 border-r border-gray-200">Description</th>
              <th scope="col" className="px-6 py-3">Contact Me</th>
            </tr>
          </thead>
          <tbody>
            {value.rows.map((item, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-50 transition duration-200 border-b border-gray-200"
              >
                <td className="px-6 py-3 border-r border-gray-200">{item.contact_type}</td>
                <td className="px-6 py-3 border-r border-gray-200">{item.code}</td>
                <td className="px-6 py-3 border-r border-gray-200">{item.name}</td>
                <td className="px-6 py-3 border-r border-gray-200">{item.phone}</td>
                <td className="px-6 py-3 border-r border-gray-200">{item.contact}</td>
                <td className="px-6 py-3 border-r border-gray-200">
                  {item.email.replace(/@/g, "[at]").replace(/\./g, "[dot]")}
                </td>
                <td className="px-6 py-3 border-r border-gray-200">{item.comments}</td>
                <td className="px-6 py-3 border-r border-gray-200">{item.description}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2 justify-center items-center">
                    <button
                      className="p-1 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handleEmailClick(item)}
                    >
                      <img src={Email} alt="Email" className="w-6 h-6" />
                    </button>
                    <button
                      className="p-1 bg-transparent border-none cursor-pointer hover:scale-110 transition-transform"
                      onClick={() => handlePhoneClick(item)}
                    >
                      <img src={Phone} alt="Phone" className="w-6 h-6" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={closeModals}
        selectedRow={selectedRow}
      />
      <PhoneModal
        isOpen={isPhoneModalOpen}
        onClose={closeModals}
        selectedRow={selectedRow}
      />
    </>
  );
};

export default ContactCards;
