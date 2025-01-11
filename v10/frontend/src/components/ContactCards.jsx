import React from "react";
import Email from "../assets/email.png";
import Phone from "../assets/phone.png";

const ContactCards = ({ name, value }) => {
//   console.log(name);
//   console.log(value);
  return (
    <>
      <div className="relative overflow-x-auto">
        <h1>{name}</h1>
        <table className="w-full text-sm text-left rtl:text-right text-black">
          <thead className="text-xs text-black uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">Contact Type</th>
              <th scope="col" className="px-6 py-3">Code</th>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Contact</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Comments</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Contact Me</th>
            </tr>
          </thead>
          <tbody>
            {value.rows.map((item, index) => (
              <tr key={index}>
                <td scope="col" className="px-6 py-3">{item.contact_type}</td>
                <td scope="col" className="px-6 py-3">{item.code}</td>
                <td scope="col" className="px-6 py-3">{item.name}</td>
                <td scope="col" className="px-6 py-3">{item.phone}</td>
                <td scope="col" className="px-6 py-3">{item.contact}</td>
                <td scope="col" className="px-6 py-3">
                  {item.email.replace(/@/g, "[at]").replace(/\./g, "[dot]")}
                </td>
                <td scope="col" className="px-6 py-3">{item.comments}</td>
                <td scope="col" className="px-6 py-3">{item.description}</td>
                <td scope="col" className="px-6 py-3">
                  <div className="flex gap-2 justify-center items-center">
                    <button className="p-1 bg-transparent border-none cursor-pointer" id="openModal">
                      <img src={Email} alt="Email" className="w-5 h-5"/>
                    </button>
                    <button className="p-1 bg-transparent border-none cursor-pointer">
                      <img src={Phone} alt="Phone" className="w-5 h-5"/>
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
