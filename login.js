const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // let email = document.getElementById("email").value.trim();
  // let password = document.getElementById("password").value.trim();

  let formData = new FormData(e.target);
  let data = Object.fromEntries(formData);
  console.log("this is the data =>", data);

  // empty validation
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  // find user
  let foundUser = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (foundUser) {
    // isLoggedIn add on object
    foundUser.isLoggedIn = true;

    // update users array
    let updatedUsers = users.map((user) =>
      user.email === foundUser.email ? foundUser : user,
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // store current session user
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

    localStorage.setItem("isLoggedIn", "true");

    alert("Login Successful ");

    window.location.href = "admin.html";
  } else {
    alert("Invalid email or password ");
  }
});
