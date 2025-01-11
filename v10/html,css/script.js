const map = L.map("map").setView([37.1090257737952, -113.543159092464], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "© OpenStreetMap contributors",
}).addTo(map);

//should automate these two cordinates and respones
const coordinates = [
  [-113.543159092464, 37.1084767228141],
  [-113.543393943663, 37.1085098346398],
  [-113.54360046834, 37.1086051763421],
  [-113.543753756573, 37.1087512483046],
  [-113.543804340828, 37.1088379872999],
  [-113.543835319538, 37.1089304320928],
  [-113.543845751431, 37.1090257737952],
  [-113.543835319538, 37.1091211154975],
  [-113.543804340828, 37.1092135602904],
  [-113.543753756573, 37.1093002992857],
  [-113.54360046834, 37.1094463712482],
  [-113.543393943663, 37.1095417129505],
  [-113.543159092464, 37.1095748247763],
  [-113.540533672597, 37.1095748247763],
  [-113.540414435518, 37.1095664834581],
  [-113.540190343113, 37.1095012658928],
  [-113.540092296721, 37.1094463712482],
  [-113.539939008488, 37.1093002992857],
  [-113.539888424233, 37.1092135602904],
  [-113.539857445523, 37.1091211154975],
  [-113.53984701363, 37.1090257737952],
  [-113.539857445523, 37.1089304320928],
  [-113.539888424233, 37.1088379872999],
  [-113.539939008488, 37.1087512483046],
  [-113.540092296721, 37.1086051763421],
  [-113.540298821398, 37.1085098346398],
  [-113.540533672597, 37.1084767228141],
];

const emergency_respones = {
  records: "6",
  server: "newtina.bluestakes.org",
  timestamp: "Thu, 9 Jan 2025 08:13:09 UTC",
  rows: [
    {
      contact_type: "EMER",
      code: "CTLUT01",
      name: "LUMEN/CENTURYLINK",
      phone: "8007789140",
      phone_ext: "",
      cell: "",
      contact: "USIC CUSTOMER SERVICE",
      email: "",
      comments: "",
      description: "FBR/PHN MARKED BY USIC",
    },
    {
      contact_type: "EMER",
      code: "QGCOCL",
      name: "ENBRIDGE GAS UTAH",
      phone: "8013243963",
      phone_ext: "",
      cell: "",
      contact: "DISPATCH OFFICE",
      email: "",
      comments:
        "CALL ENBRIDGE GAS UTAH FOR EMERGENCIES IN BIRDSEYE - UTAH COUNTY, GARFIELD, PIUTE, SANPETE AND SEVIER COUNTIES",
      description: "GAS MARKED BY ELM LOCATING",
    },
    {
      contact_type: "EMER",
      code: "QGCOCL",
      name: "ENBRIDGE GAS UTAH",
      phone: "8887289343",
      phone_ext: "",
      cell: "",
      contact: "ELM LOCATING",
      email: "",
      comments: "",
      description: "GAS MARKED BY ELM LOCATING",
    },
    {
      contact_type: "EMER",
      code: "SGCP",
      name: "ST GEORGE CITY POWER",
      phone: "4356274835",
      phone_ext: "",
      cell: "",
      contact: "CONTROL ROOM OPERATOR",
      email: "",
      comments: "",
      description: "ELECTRIC",
    },
    {
      contact_type: "EMER",
      code: "SGCSW",
      name: "ST GEORGE CITY SEWER & WATER",
      phone: "4356274835",
      phone_ext: "",
      cell: "",
      contact: "DISPATCH",
      email: "",
      comments: "",
      description: "IRRIGATION, SWR & CULINARY WTR",
    },
    {
      contact_type: "EMER",
      code: "TDSB",
      name: "TDS TELECOM LLC",
      phone: "4353194618",
      phone_ext: "",
      cell: "",
      contact: "TDS ON CALL TECH",
      email: "",
      comments: "",
      description: "CATV MARKED BY USIC",
    },
  ],
};

const plan_response = {
  records: "5",
  server: "newtina.bluestakes.org",
  timestamp: "Thu, 9 Jan 2025 06:36:48 UTC",
  rows: [
    {
      contact_type: "ENGR",
      code: "CTLUT01",
      name: "LUMEN/CENTURYLINK",
      phone: "3854797345",
      phone_ext: "",
      cell: "",
      contact: "JAMES CHIDESTER",
      email: "JAMES.CHIDESTER@LUMEN.COM",
      comments: "",
      description: "FBR/PHN MARKED BY USIC",
    },
    {
      contact_type: "ENGR",
      code: "QGCOCL",
      name: "ENBRIDGE GAS UTAH",
      phone: "8013243970",
      phone_ext: "",
      cell: "",
      contact: "SL MAPPING DEPARTMENT",
      email: "MAP.REQUESTS@DOMINIONENERGY.COM",
      comments: "FOR PRINTED & ELECTRONIC MAPS",
      description: "GAS MARKED BY ELM LOCATING",
    },
    {
      contact_type: "ENGR",
      code: "SGCP",
      name: "ST GEORGE CITY POWER",
      phone: "4356274896",
      phone_ext: "",
      cell: "",
      contact: "BARBARA BERRETT",
      //   email: "BARB.BERRETT@SGCITY.ORG",
      email: "pranithtettabavi@gmail.com",
      comments: "OR WESTON NELSON @ 435-627-4818 WESTON.NELSON@SGCITY.ORG",
      description: "ELECTRIC",
    },
    {
      contact_type: "ENGR",
      code: "SGCSW",
      name: "ST GEORGE CITY SEWER & WATER",
      phone: "4356274854",
      phone_ext: "",
      cell: "",
      contact: "KADE BRINGHURST",
      //   email: "KADE.BRINGHURST@SGCITY.ORG",
      email: "pranithtettabavi03@gmail.com",
      comments: "",
      description: "IRRIGATION, SWR & CULINARY WTR",
    },
    {
      contact_type: "ENGR",
      code: "TDSB",
      name: "TDS TELECOM LLC",
      phone: "6086640148",
      phone_ext: "",
      cell: "",
      contact: "BRIAN RESCH",
      email: "BRIAN.RESCH@TDSTELECOM.COM",
      comments: "",
      description: "CATV MARKED BY USIC",
    },
  ],
};

// function captureMapAndSendEmail() {
//   html2canvas(document.getElementById("map")).then(function (canvas) {
//     canvas.toBlob(function (blob) {
//       const formData = new FormData();
//       formData.append("mapImage", blob, "map.png");

//       fetch("/send-email", {
//         method: "POST",
//         body: formData,
//       })
//         .then((response) => response.json())
//         .then((data) => console.log(data))
//         .catch((error) => console.error("Error:", error));
//     });
//   });
// }

async function getStreetName(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    return data.address
      ? data.address.road || "Unknown Street"
      : "No Address Found";
  } catch (error) {
    console.error("Error fetching street name:", error);
    return "Error fetching street name";
  }
}

L.polygon(
  coordinates.map((coord) => [coord[1], coord[0]]),
  {
    color: "blue",
    fillOpacity: 0.4,
  }
).addTo(map);

map.on("load", function () {
  html2canvas(document.getElementById("map")).then(function (canvas) {
    var link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "map.png";
    link.click();
  });
});

const tableBody1 = document.querySelector("#responseTablePlan tbody");
const tableBody2 = document.querySelector("#responseTableEmer tbody");
const dropdown1 = document.getElementById("countries");

const handleClick = async (email, code, name) => {
  try {
    const res = [];
    for (const [lat, lon] of coordinates) {
      //   const temp = await getStreetName(lon, lat);
      //   // console.log(temp);
      //   res.push(temp);
    }
    console.log(`Sending email to: ${email} | Code: ${code} | Name: ${name}`);

    const response = await fetch("http://localhost:3000/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, code, name, coordinates, res }),
    });
    // console.log(response);
    const result = await response.json();
    console.log(result.message);
    alert(result.message);
  } catch (error) {
    console.error("Error sending email:", error);
    alert("Failed to send email.");
  }
};

plan_response.rows.forEach((row) => {
  const email = row.email.replace(/@/g, "[at]").replace(/\./g, "[dot]");
  //const obfuscatedEmail = email.
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${row.contact_type}</td>
    <td>${row.code}</td>
    <td>${row.name}</td>
    <td>${row.phone}</td>
    <td>${row.contact}</td>
    <td>${email}</td>
    <td>${row.comments}</td>
    <td>${row.description}</td>
    <td>
    <div class="icons">
        <button class="mail" id="openModal"><img src="./src/email.png"></img></button>
    <button class="phone"><img src="./src/phone.png"></img></button>
    </div>
    </td>
  `;

  // Append the row to the table
  tableBody1.appendChild(tr);
  const button = tr.querySelector("button");
  button.addEventListener("click", () =>
    handleClick(row.email, row.code, row.name)
  );
});

emergency_respones.rows.forEach((row) => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
      <td>${row.contact_type}</td>
      <td>${row.code}</td>
      <td>${row.name}</td>
      <td>${row.phone}</td>
      <td>${row.contact}</td>
      <td>${row.email}</td>
      <td>${row.comments}</td>
      <td>${row.description}</td>
      <td>
        <div class="icons">
        <button class="mail" id="openModal"><img src="./src/email.png"></img></button>
        <button class="phone"><img src="./src/phone.png"></img></button>
        </div>
      </td>
    `;
  tableBody2.appendChild(tr);
  const button = tr.querySelector("button");
  // button.addEventListener("click", () =>
  //   handleClick(row.email, row.code, row.name)
  // );
});

const tabs = document.querySelectorAll(".tab");
const contents = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    contents.forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    document
      .getElementById(tab.getAttribute("data-tab"))
      .classList.add("active");
  });
});

// Modal Elements
const modal = document.getElementById("myModal");
const closeModalBtn = document.querySelector(".close");
const sendEmailBtn = document.getElementById("sendEmail");

// Open Modal when the Mail button is clicked (Event Delegation)
document
  .querySelector("#responseTablePlan tbody")
  .addEventListener("click", (e) => {
    if (e.target.closest(".mail")) {
      // Get the email associated with the clicked row
      const row = e.target.closest("tr"); // Get the parent row
      const email = row.querySelector("td:nth-child(6)").textContent; // Email is in the 6th column

      // Set the email in the modal
      document.querySelector(".email").textContent = `Email: ${email
        .replace(/@/g, "[at]")
        .replace(/\./g, "[dot]")}`;

      // Open the modal
      modal.style.display = "block";
    }
  });

// Close Modal on Close Button Click
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close Modal on Clicking Outside Modal Content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Optional: Add functionality to the Send Email button
sendEmailBtn.addEventListener("click", () => {
  const userInput = document.getElementById("userInput").value;
  console.log("Email Sent with Message:", userInput);
  modal.style.display = "none"; // Close modal after sending
});
