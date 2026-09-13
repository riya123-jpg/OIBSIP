import registerPizza from "../../../../assets/images/login/pizza_1.png";

import "./LoginVisual.css";

function LoginVisual() {
  return (
    <section className="login-visual">
      <img
        src={registerPizza}
        alt="Freshly prepared Sliceory pizza"
        className="login-visual__image"
      />

      <div className="login-visual__overlay" />

      <div className="login-visual__content">
        <span className="login-visual__eyebrow">WELCOME BACK TO SLICEORY</span>

        <h2 className="login-visual__title">
          Good to see
          <span>you again.</span>
        </h2>

        <p className="login-visual__description">
          Your favourites, your custom pizzas, and your next order are just a
          login away.
        </p>
      </div>
    </section>
  );
}

export default LoginVisual;
