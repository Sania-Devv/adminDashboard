let isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn) {
  window.location.href = "login.html";
}
console.log(localStorage);
let usersData = [];

const API_URL = "https://fakestoreapi.com/users";

async function getUsers() {
  try {
    let response = await fetch(API_URL);
    usersData = await response.json();

    renderTable(usersData);
  } catch (error) {
    console.log("Error:", error);
  }
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
