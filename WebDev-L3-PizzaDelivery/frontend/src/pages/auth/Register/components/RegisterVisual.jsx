import registerPizza from "../../../../assets/images/register/pizza_1.png";

import "./RegisterVisual.css";

function RegisterVisual() {
  return (
    <section className="register-visual">
      <img
        src={registerPizza}
        alt="Freshly prepared Sliceory pizza"
        className="register-visual__image"
      />

      <div className="register-visual__overlay" />

      <div className="register-visual__content">
        <span className="register-visual__eyebrow">WELCOME TO SLICEORY</span>

        <h2 className="register-visual__title">
          Your pizza.
          <span>Your way.</span>
        </h2>

        <p className="register-visual__description">
          Create your account and start building pizzas exactly the way you like
          them.
        </p>
      </div>
    </section>
  );
}

export default RegisterVisual;
