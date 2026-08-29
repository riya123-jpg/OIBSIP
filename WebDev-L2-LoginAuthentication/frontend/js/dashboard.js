const username = document.querySelector("#username");
const userUsername = document.querySelector("#user-username");
const userEmail = document.querySelector("#user-email");
const logoutBtn = document.querySelector("#logout-btn");

async function loadCurrentUser() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/get-me", {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      window.location.href = "./login.html";
      return;
    }

    displayUser(data.user);
  } catch (error) {
    console.error("Dashboard error:", error);

    window.location.href = "./login.html";
  }
}

function displayUser(user) {
  username.textContent = user.username;
  userUsername.textContent = user.username;
  userEmail.textContent = user.email;
}

loadCurrentUser();

async function logoutUser() {
  try {
    const response = await fetch("http://localhost:3000/api/auth/logout", {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      window.location.href = "./login.html";
    }
  } catch (error) {
    console.error("Logout error:", error);
  }
}

logoutBtn.addEventListener("click", logoutUser);
