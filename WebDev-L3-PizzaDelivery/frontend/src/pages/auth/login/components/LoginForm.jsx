import "./LoginForm.css";

function LoginForm() {
  return (
    <div className="login-form">
      <a href="/" className="login-form__logo">
        Sliceory
      </a>

      <div className="login-form__heading">
        <span className="login-form__eyebrow">WELCOME BACK</span>

        <h1>Login to Sliceory</h1>

        <p>Sign in to continue ordering your favourite pizzas.</p>
      </div>

      <form className="login-form__form">
        <div className="login-form__field">
          <label htmlFor="login-email">Email Address</label>

          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </div>

        <div className="login-form__field">
          <label htmlFor="login-password">Password</label>

          <div className="login-form__input-wrap">
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="button"
              className="login-form__toggle"
              aria-label="Show password"
            >
              Show
            </button>
          </div>
        </div>

        <div className="login-form__options">
          <a href="/forgot-password" className="login-form__forgot">
            Forgot Password?
          </a>
        </div>

        <button type="submit" className="login-form__submit">
          Login
        </button>
      </form>

      <p className="login-form__register">
        Don't have an account?
        <a href="/register"> Sign Up</a>
      </p>
    </div>
  );
}

export default LoginForm;
