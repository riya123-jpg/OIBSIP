import "./ForgotPasswordForm.css";

function ForgotPasswordForm() {
  return (
    <div className="forgot-password-form">
      <a href="/" className="forgot-password-form__logo">
        Sliceory
      </a>

      <div className="forgot-password-form__heading">
        <span className="forgot-password-form__eyebrow">PASSWORD RESET</span>

        <h1>Forgot Your Password?</h1>

        <p>Enter your email and we'll send you a secure reset link.</p>
      </div>

      <form className="forgot-password-form__form">
        <div className="forgot-password-form__field">
          <label htmlFor="reset-email">Email Address</label>

          <input
            id="reset-email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <button type="submit" className="forgot-password-form__submit">
          Send Reset Link
        </button>
      </form>

      <div className="forgot-password-form__back">
        <a href="/login">← Back to Login</a>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;
