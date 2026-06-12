
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email"); 
const password = document.getElementById("password"); 
const confirmPassword = document.getElementById("confirmPassword"); 
const role = document.getElementById("role");
const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener('click', () => {

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = {
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
    email: email.value.trim(),
    password: password.value.trim(),
    role: role.value
  };

  // empty check
  if (
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.password ||
    !confirmPassword.value
  ) {
    alert("Please fill all fields");
    return;
  }

  // password match
  if (user.password !== confirmPassword.value) {
    alert("Passwords do not match");
    return;
  }

  // duplicate email check
  let emailExists = users.some(u => u.email === user.email);

  if (emailExists) {
    alert("Email already exists");
    return;
  }

  // save user
  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");

  window.location.href = "login.html";

});