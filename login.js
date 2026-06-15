const loginForm = document.getElementById("loginForm");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let formData = new FormData(e.target);
  let data = Object.fromEntries(formData);

  let email = data.email.trim();
  let password = data.password.trim();

  // validation
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  if (!emailRegex.test(email)) {
    alert("Invalid email format");
    return;
  }

  // sirf match check
  let foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    // bas yahi enough hai
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    localStorage.setItem("isLoggedIn", "true");

    alert("Login Successful");
    window.location.href = "admin.html";
  } else {
    alert("Invalid email or password");
  }
});