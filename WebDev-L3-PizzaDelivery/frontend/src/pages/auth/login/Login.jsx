import LoginForm from "./components/LoginForm";
import LoginVisual from "./components/LoginVisual";

import "./Login.css";

function Login() {
  return (
    <main className="login-page">
      <div className="login-page__form">
        <LoginForm />
      </div>

      <div className="login-page__visual">
        <LoginVisual />
      </div>
    </main>
  );
}

export default Login;
