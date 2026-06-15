const signupForm = document.getElementById("signupForm");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  console.log("Form Submitted");

  let users = JSON.parse(localStorage.getItem("users")) || [];
  console.log("Existing Users:", users);

  // FormData
  let formData = new FormData(e.target);
  let data = Object.fromEntries(formData);

  console.log("Form Data:", data);

  // Trim values
  let firstName = data.firstName.trim();
  let lastName = data.lastName.trim();
  let email = data.email.trim();
  let password = data.password.trim();
  let confirmPassword = data.confirmPassword.trim();
  let role = data.role;

  // Empty Validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    console.log("Empty Fields");
    alert("Please fill all fields");
    return;
  }

  // Email Validation
  if (!emailRegex.test(email)) {
    console.log("Invalid Email");
    alert("Invalid email format");
    return;
  }

  // Password Validation
  if (!passwordRegex.test(password)) {
    console.log("Weak Password");
    alert("Password must contain at least 6 characters, one letter and one number");
    return;
  }

  // Confirm Password Check
  if (password !== confirmPassword) {
    console.log("Password Mismatch");
    alert("Passwords do not match");
    return;
  }

  // Duplicate Email Check
  let emailExists = users.some((user) => user.email === email);

  console.log("Email Exists:", emailExists);

  if (emailExists) {
    alert("Email already exists");
    return;
  }

  // User Object
  let user = {
    firstName,
    lastName,
    email,
    password,
    role,
    isLoggedIn: false,
  };

  console.log("New User:", user);

  // Save User
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  console.log(
    "Updated LocalStorage:",
    JSON.parse(localStorage.getItem("users"))
  );

  alert("Signup Successful!");

  window.location.href = "login.html";
});