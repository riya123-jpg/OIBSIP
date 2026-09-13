import RegisterForm from "./components/RegisterForm";
import RegisterVisual from "./components/RegisterVisual";


import "./Register.css";

function Register() {
  return (
    <main className="register-page">
      <div className="register-page__form">
        <RegisterForm />
      </div>

      <div className="register-page__visual">
        <RegisterVisual />
      </div>
    </main>
  );
}

export default Register;
