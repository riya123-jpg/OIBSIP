import "./ProgressBar.css";

function ProgressBar({ currentStep, steps }) {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div className="progress-bar__item" key={step}>
            <button
              type="button"
              className={[
                "progress-bar__step",
                isCompleted ? "progress-bar__step--completed" : "",
                isCurrent ? "progress-bar__step--current" : "",
              ].join(" ")}
            >
              <span>{stepNumber}</span>
            </button>

            <span className="progress-bar__label">{step}</span>

            {index < steps.length - 1 && (
              <div
                className={[
                  "progress-bar__line",
                  isCompleted ? "progress-bar__line--completed" : "",
                ].join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ProgressBar;
