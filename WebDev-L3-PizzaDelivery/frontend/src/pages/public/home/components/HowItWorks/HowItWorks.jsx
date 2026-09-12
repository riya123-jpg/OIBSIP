import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    title: "Choose Your Base",
    description: "Start with one of our five crust options.",
  },
  {
    number: "02",
    title: "Pick Your Sauce",
    description: "Choose from five signature sauce options.",
  },
  {
    number: "03",
    title: "Select Your Cheese",
    description: "Finish your base with your favourite cheese.",
  },
  {
    number: "04",
    title: "Add Your Toppings",
    description: "Mix and match your favourite toppings.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <div className="how-it-works__header">
          <span className="how-it-works__eyebrow">SIMPLE PROCESS</span>

          <h2 className="how-it-works__title">Build Your Perfect Pizza</h2>

          <p className="how-it-works__description">
            From base to bite, in just four easy steps.
          </p>
        </div>

        <div className="how-it-works__steps">
          {steps.map((step, index) => (
            <div className="how-it-works__step-group" key={step.number}>
              <article className="how-it-works__step">
                <div className="how-it-works__number">{step.number}</div>

                <div className="how-it-works__icon">
                  <span />
                </div>

                <h3 className="how-it-works__step-title">{step.title}</h3>

                <p className="how-it-works__step-description">
                  {step.description}
                </p>
              </article>

              {index < steps.length - 1 && (
                <div className="how-it-works__connector" aria-hidden="true">
                  <span>→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="how-it-works__cta">
          <a href="/builder" className="how-it-works__button">
            Start Building Your Pizza
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
