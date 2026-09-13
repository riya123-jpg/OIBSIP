import "./RegisterForm.css";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <div className="register-form">
      <a href="/" className="register-form__logo">
        Sliceory
      </a>

      <div className="register-form__heading">
        <span className="register-form__eyebrow">GET STARTED</span>

        <h1>Create Your Account</h1>

        <p>Sign up to start ordering your favourite pizzas.</p>
      </div>

      <form className="register-form__form">
        <div className="register-form__field">
          <label htmlFor="username">Username</label>

          <input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="register-form__field">
          <label htmlFor="password">Password</label>

          <div className="register-form__input-wrap">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
            />

            <button
              type="button"
              className="register-form__toggle"
              aria-label="Show password"
            >
              Show
            </button>
          </div>
        </div>

        <div className="register-form__field">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <div className="register-form__input-wrap">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
            />

            <button
              type="button"
              className="register-form__toggle"
              aria-label="Show confirm password"
            >
              Show
            </button>
          </div>
        </div>

        <label className="register-form__terms">
          <input type="checkbox" />

          <span>
            I agree to the <a href="#">Terms & Conditions</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </span>
        </label>

        <p className="register-form__verification-note">
          You’ll receive a verification link after signing up.
        </p>

        <button type="submit" className="register-form__submit">
          Create Account
        </button>
      </form>

      <p className="register-form__login">
        Already have an account?
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default RegisterForm;
