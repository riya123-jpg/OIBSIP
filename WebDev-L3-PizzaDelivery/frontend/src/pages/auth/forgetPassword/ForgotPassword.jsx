import ForgotPasswordForm from "./component/ForgotPasswordForm";

import "./ForgotPassword.css";

function ForgotPassword() {
  return (
    <main className="forgot-password-page">
      <div className="forgot-password-page__form">
        <ForgotPasswordForm />
      </div>

      <div className="forgot-password-page__visual">
        <div className="forgot-password-page__visual-content">
          <span className="forgot-password-page__eyebrow">NEED A RESET?</span>

          <h2 className="forgot-password-page__title">
            Get back to
            <span>your Sliceory.</span>
          </h2>

          <p className="forgot-password-page__description">
            Enter your email and we'll help you get back into your account.
          </p>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
