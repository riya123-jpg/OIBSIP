//dom selection
const registerForm = document.querySelector("#register-form");

const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

const formMsg = document.querySelector("#form-message");

const registerBtn = document.querySelector("#register-btn");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!username || !email || !password) {
    formMsg.textContent = "Please fill in all fields.";
    formMsg.className = "form-message error";
    return;
  }
  console.log(username, email, password);
  //   formMsg.textContent = "Registration successful.";
  //   formMsg.className = "form-message success";

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      formMsg.textContent = data.message;
      formMsg.className = "form-message error";
      return;
    }
    formMsg.textContent = data.message;
    formMsg.className = "form-message success";

    window.location.href = "./login.html";
  } catch (error) {
    console.error("Registration error:", error);

    formMsg.textContent = "Unable to connect to the server. Please try again.";
    formMsg.className = "form-message error";
  }
});
