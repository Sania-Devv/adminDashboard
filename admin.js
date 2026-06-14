let isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  window.location.href = "login.html";
}
console.log(localStorage);
let usersData = [];

const API_URL = "https://dummyjson.com/users";

async function getUsers() {
  try {
    let response = await fetch(API_URL);
    let data = await response.json();

    usersData = data.users; 

    renderTable(usersData);
  } catch (error) {
    console.log("Error:", error);
  }
}
function renderTable(users) {
  const tableBody = document.getElementById("tableBody");
  const theadRow = document.querySelector("thead tr");

  tableBody.innerHTML = "";
  theadRow.innerHTML = "";

  if (!users || users.length === 0) return;

  const keys = Object.keys(users[0]);

  // ================= HEADER =================
  keys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    th.className = "p-3 text-left capitalize bg-gray-100";
    theadRow.appendChild(th);
  });

  // ================= ROWS =================
  users.forEach((user) => {
    const tr = document.createElement("tr");

    keys.forEach((key) => {
      const td = document.createElement("td");
      td.className = "p-3 whitespace-nowrap";

      let value = user[key];

      // // FIX object Object issue
      if (typeof value === "object" && value !== null) {
        value = Object.values(value).join(" ");
      }

      td.textContent = value;
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

async function initDashboard() {
  await getUsers();
//   renderTable();
}
initDashboard();

const avatar = document.getElementById("avatar");
const dropdown = document.getElementById("dropdown");

avatar.addEventListener("click", () => {
  dropdown.classList.toggle("hidden");
});
const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("users");
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("isLoggedIn");

  window.location.href = "login.html";
});


// sidebartoggle
 
      const sidebar = document.getElementById("sidebar");
      const menuBtn = document.getElementById("menuBtn");
      const overlay = document.getElementById("overlay");

      menuBtn.addEventListener("click", () => {
        sidebar.classList.remove("-translate-x-full");
        overlay.classList.remove("hidden");
      });

      overlay.addEventListener("click", () => {
        sidebar.classList.add("-translate-x-full");
        overlay.classList.add("hidden");
      });
  