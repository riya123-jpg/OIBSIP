const loginForm = document.querySelector("#login-form");
const identifierInput = document.querySelector("#identifier");
const passwordInput = document.querySelector("#password");
const formMsg = document.querySelector("#form-message");
const loginBtn = document.querySelector("#login-btn");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const identifier = identifierInput.value.trim();
  const password = passwordInput.value.trim();
  if (!identifier || !password) {
    formMsg.textContent = "Please Fill in all fields";
    formMsg.className = "form-message error";
    return;



    
  }
  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",



      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        identifier,
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

    window.location.href = "./dashboard.html";
  } catch (err) {
    console.log("error in login");

    formMsg.textContent = "unable to coonect to the server. Please try again.";
    formMsg.className = "form-message error";
  }
});
