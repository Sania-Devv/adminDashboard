const loginForm = document.getElementById("loginForm");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Login Form Submitted");

  let users = JSON.parse(localStorage.getItem("users")) || [];

  console.log("Users from LocalStorage:", users);

  // FormData
  let formData = new FormData(e.target);
  let data = Object.fromEntries(formData);

  console.log("Login Data:", data);

  let email = data.email.trim();
  let password = data.password.trim();

  // Empty Validation
  if (!email || !password) {
    console.log(" Empty Fields");
    alert("Please fill all fields");
    return;
  }

  // Email Validation
  if (!emailRegex.test(email)) {
    console.log(" Invalid Email");
    alert("Invalid email format");
    return;
  }

  console.log("Email Valid");

  // Find User
  let foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  console.log("🔍 Found User:", foundUser);

  if (foundUser) {
    console.log("Login Success");

    // Update Login Status
    foundUser.isLoggedIn = true;

    let updatedUsers = users.map((user) =>
      user.email === foundUser.email ? foundUser : user
    );

    console.log("📚 Updated Users:", updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Current Session User
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    // Global Login Flag
    localStorage.setItem("isLoggedIn", "true");

    console.log(
      "Logged In User:",
      JSON.parse(localStorage.getItem("loggedInUser"))
    );

    alert("Login Successful");

    window.location.href = "admin.html";
  } else {
    console.log("Invalid Credentials");
    alert("Invalid email or password");
  }
});