import React from "react";
import emergency from "../responses/emergency.json";
import plan from "../responses/plan.json";
import Email from "../assets/email.png";

const Contact = () => {
  return (
    <>
      <div className="tab-containers">
        <div>Emergency</div>
        <div>Plan & Design</div>
      </div>
      <div>
        <h1>Emergency Contacts</h1>
        <table>
          <thead>
            <tr>
              <th>Contact Type</th>
              <th>Code</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Comments</th>
              <th>Description</th>
              <th>Contact Me</th>
            </tr>
          </thead>
          <tbody>
            {emergency.rows.map((item) => (
              <tr key={item.phone}>
                <td>{item.contact_type}</td>
                <td>{item.code}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.contact}</td>
                <td>
                  {item.email.replace(/@/g, "[at]").replace(/\./g, "[dot]")}
                </td>
                <td>{item.comments}</td>
                <td>{item.description}</td>
                <td>
                  <div class="icons">
                    <button class="mail" id="openModal">
                      <img src="./src/email.png"></img>
                    </button>
                    <button class="phone">
                      <img src="./src/phone.png"></img>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plan */}
    </>
  );
};

export default Contact;
