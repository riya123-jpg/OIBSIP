import "./Hero.css";
import heroPizza from "../../../../../assets/images/hero/hero_pizza.png";
function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero__container">
        {/* Left Content */}
        <div className="hero__content">
          <span className="hero__eyebrow">CRAFTED FOR CRAVINGS</span>

          <h1 className="hero__title">
            Your pizza.
            <span>Your way.</span>
          </h1>

          <p className="hero__description">
            Pick a favourite or build one from scratch with your choice of base,
            sauce, cheese and toppings.
          </p>

          <div className="hero__actions">
            <a href="#builder" className="hero__button hero__button--primary">
              Build Your Pizza
            </a>

            <a href="#menu" className="hero__button hero__button--secondary">
              Explore Menu
            </a>
          </div>

          <div className="hero__meta">
            <span>Fresh ingredients</span>
            <span className="hero__meta-dot">•</span>
            <span>Made your way</span>
            <span className="hero__meta-dot">•</span>
            <span>Delivered fresh</span>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>5</strong>
              <span>Pizza Bases</span>
            </div>

            <span className="hero__stat-divider" />

            <div className="hero__stat">
              <strong>5</strong>
              <span>Sauce Options</span>
            </div>

            <span className="hero__stat-divider" />

            <div className="hero__stat">
              <strong>4</strong>
              <span>Builder Steps</span>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="hero__visual">
          <div className="hero__image-wrap">
            <img
              src={heroPizza}
              alt="Freshly prepared pizza"
              className="hero__image"
            />

            <div className="hero__badge">
              <span className="hero__badge-icon">✦</span>

              <div className="hero__badge-content">
                <strong>4-Step</strong>
                <span>Custom Builder</span>
              </div>
            </div>

            <a href="/builder" className="hero__image-label">
              <span className="hero__image-label-icon">✦</span>

              <span className="hero__image-label-text">Make it yours</span>

              <span className="hero__image-label-arrow">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero__scroll">
        <span>Scroll to explore</span>
        <span className="hero__scroll-arrow">↓</span>
      </div>
    </section>
  );
}

export default Hero;
