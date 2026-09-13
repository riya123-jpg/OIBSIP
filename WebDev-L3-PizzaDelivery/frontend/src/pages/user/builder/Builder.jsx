import { useState } from "react";

import ProgressBar from "./components/ProgressBar/ProgressBar";
import PizzaPreview from "./components/PizzaPreview/PizzaPreview";
import BuilderStep from "./components/BuilderStep/BuilderStep";
import BuilderNavigation from "./components/BuilderNavigation/BuilderNavigation";

import "./Builder.css";

const steps = ["Base", "Sauce", "Cheese", "Toppings"];

function Builder() {
  const [currentStep, setCurrentStep] = useState(1);

  const [selections, setSelections] = useState({
    base: null,
    sauce: null,
    cheese: null,
    toppings: [],
  });

  const calculateTotalPrice = () => {
    let total = 249;

    if (selections.base) {
      total += selections.base.price || 0;
    }

    if (selections.sauce) {
      total += selections.sauce.price || 0;
    }

    if (selections.cheese) {
      total += selections.cheese.price || 0;
    }

    selections.toppings.forEach((topping) => {
      total += topping.price || 0;
    });

    return total;
  };

  const totalPrice = calculateTotalPrice();

  const canGoNext =
    currentStep === 4
      ? true
      : Boolean(
          currentStep === 1
            ? selections.base
            : currentStep === 2
              ? selections.sauce
              : selections.cheese,
        );

  return (
    <main className="builder-page">
      <div className="builder-page__container">
        <header className="builder-page__header">
          <span className="builder-page__eyebrow">BUILD YOUR PIZZA</span>

          <h1 className="builder-page__title">Make it exactly yours.</h1>

          <p className="builder-page__description">
            Choose your base, sauce, cheese and favourite toppings.
          </p>
        </header>

        <ProgressBar currentStep={currentStep} steps={steps} />

        <div className="builder-page__workspace">
          <PizzaPreview selections={selections} totalPrice={totalPrice} />

          <BuilderStep
            currentStep={currentStep}
            selections={selections}
            setSelections={setSelections}
          />
        </div>

        {currentStep <= 4 && (
          <BuilderNavigation
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            canGoNext={canGoNext}
            totalPrice={totalPrice}
          />
        )}
      </div>
    </main>
  );
}

export default Builder;
