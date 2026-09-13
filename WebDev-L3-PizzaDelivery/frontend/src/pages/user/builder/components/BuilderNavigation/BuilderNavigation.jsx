import { ArrowLeft, ArrowRight, ClipboardCheck } from "lucide-react";

import "./BuilderNavigation.css";

function BuilderNavigation({
  currentStep,
  setCurrentStep,
  canGoNext,
  totalPrice,
}) {
  const isFirstStep = currentStep === 1;
  const isReviewStep = currentStep === 5;

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep((previous) => previous - 1);
    }
  };

  const handleNext = () => {
    if (!canGoNext) {
      return;
    }

    if (currentStep < 5) {
      setCurrentStep((previous) => previous + 1);
    }
  };

  return (
    <div className="builder-navigation">
      <div className="builder-navigation__inner">
        <button
          type="button"
          className="builder-navigation__back"
          onClick={handleBack}
          disabled={isFirstStep}
        >
          <ArrowLeft size={17} />
          <span>Back</span>
        </button>

        <div className="builder-navigation__price">
          <span>Current Price</span>
          <strong>₹{totalPrice}</strong>
        </div>

        <button
          type="button"
          className="builder-navigation__next"
          onClick={handleNext}
          disabled={!canGoNext}
        >
          <span>{currentStep === 4 ? "Review Order" : "Next"}</span>

          {currentStep === 4 ? (
            <ClipboardCheck size={17} />
          ) : (
            <ArrowRight size={17} />
          )}
        </button>
      </div>
    </div>
  );
}

export default BuilderNavigation;
