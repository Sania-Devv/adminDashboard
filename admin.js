let isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  window.location.href = "login.html";
}
// console.log(localStorage);
let usersData = [];

const API_URL = "https://dummyjson.com/users";

async function getUsers() {
  try {
    let response = await fetch(API_URL);
    let data = await response.json();

    usersData = data.users; 
    console.log(usersData);

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

  //  filter out object-type columns
  const filteredKeys = keys.filter((key) => {
    return typeof users[0][key] !== "object" || users[0][key] === null;
  });

  // HEADER
  filteredKeys.forEach((key) => {
    const th = document.createElement("th");
    th.textContent = key;
    th.className = "p-3 text-left capitalize bg-gray-100";
    theadRow.appendChild(th);
  });

  // ROWS
  users.forEach((user) => {
    const tr = document.createElement("tr");

    filteredKeys.forEach((key) => {
      const td = document.createElement("td");
      td.className = "p-3 max-w-[150px] truncate whitespace-nowrap overflow-hidden";
      td.textContent = user[key];
      tr.appendChild(td);
    });

    tableBody.appendChild(tr);
  });
}

async function initDashboard() {
  await getUsers();
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
  