import SelectionCard from "../SelectionCard/SelectionCard";
import ToppingCard from "../ToppingCard/ToppingCard";
import ReviewOrder from "../ReviewOrder/ReviewOrder";

import "./BuilderStep.css";

/* =========================
   BASE OPTIONS
========================= */

const baseOptions = [
  {
    id: "thin-crust",
    name: "Thin Crust",
    description: "Light and crispy",
    price: 0,
    category: "base",
    visualType: "thin",
  },
  {
    id: "classic",
    name: "Classic Hand Tossed",
    description: "Soft with a golden edge",
    price: 20,
    category: "base",
    visualType: "classic",
  },
  {
    id: "cheese-burst",
    name: "Cheese Burst",
    description: "Extra cheesy crust",
    price: 50,
    category: "base",
    visualType: "cheese-burst",
  },
  {
    id: "whole-wheat",
    name: "Whole Wheat",
    description: "Hearty and wholesome",
    price: 30,
    category: "base",
    visualType: "whole-wheat",
  },
  {
    id: "gluten-free",
    name: "Gluten Free",
    description: "Light gluten-free base",
    price: 40,
    category: "base",
    visualType: "gluten-free",
  },
];

/* =========================
   SAUCE OPTIONS
========================= */

const sauceOptions = [
  {
    id: "tomato",
    name: "Tomato",
    description: "Classic rich tomato",
    price: 0,
    category: "sauce",
    visualType: "tomato",
  },
  {
    id: "bbq",
    name: "BBQ",
    description: "Smoky and bold",
    price: 20,
    category: "sauce",
    visualType: "bbq",
  },
  {
    id: "white-garlic",
    name: "White Garlic",
    description: "Creamy garlic sauce",
    price: 20,
    category: "sauce",
    visualType: "white-garlic",
  },
  {
    id: "pesto",
    name: "Pesto",
    description: "Herby and fresh",
    price: 25,
    category: "sauce",
    visualType: "pesto",
  },
  {
    id: "arrabbiata",
    name: "Spicy Arrabbiata",
    description: "Hot and tangy",
    price: 25,
    category: "sauce",
    visualType: "arrabbiata",
  },
];

/* =========================
   CHEESE OPTIONS
========================= */

const cheeseOptions = [
  {
    id: "mozzarella",
    name: "Mozzarella",
    description: "Classic stretchy cheese",
    price: 0,
    category: "cheese",
    visualType: "mozzarella",
  },
  {
    id: "cheddar",
    name: "Cheddar",
    description: "Rich and sharp",
    price: 20,
    category: "cheese",
    visualType: "cheddar",
  },
  {
    id: "four-cheese",
    name: "Four Cheese Blend",
    description: "Rich and indulgent",
    price: 40,
    category: "cheese",
    visualType: "four-cheese",
  },
  {
    id: "vegan-cheese",
    name: "Vegan Cheese",
    description: "Plant-based alternative",
    price: 35,
    category: "cheese",
    visualType: "vegan-cheese",
  },
  {
    id: "extra-cheese",
    name: "Extra Cheese",
    description: "More cheese, more goodness",
    price: 30,
    category: "cheese",
    visualType: "extra-cheese",
  },
];

/* =========================
   TOPPING OPTIONS
========================= */

const toppingOptions = [
  {
    id: "onion",
    name: "Onion",
    description: "Sharp and crunchy",
    price: 20,
    emoji: "🧅",
    visualType: "onion",
  },
  {
    id: "capsicum",
    name: "Capsicum",
    description: "Fresh and crisp",
    price: 20,
    emoji: "🫑",
    visualType: "capsicum",
  },
  {
    id: "mushroom",
    name: "Mushroom",
    description: "Earthy and meaty",
    price: 30,
    emoji: "🍄",
    visualType: "mushroom",
  },
  {
    id: "olives",
    name: "Black Olives",
    description: "Rich and tangy",
    price: 25,
    emoji: "🫒",
    visualType: "olives",
  },
  {
    id: "corn",
    name: "Sweet Corn",
    description: "Sweet and crunchy",
    price: 20,
    emoji: "🌽",
    visualType: "corn",
  },
  {
    id: "jalapeno",
    name: "Jalapeño",
    description: "Spicy kick",
    price: 25,
    emoji: "🌶️",
    visualType: "jalapeno",
  },
];

/* =========================
   COMPONENT
========================= */

function BuilderStep({ currentStep, selections, setSelections }) {
  /* =========================
     SINGLE SELECT
     Base / Sauce / Cheese
  ========================= */

  const handleSingleSelection = (type, option) => {
    setSelections((previous) => ({
      ...previous,
      [type]: option,
    }));
  };

  /* =========================
     MULTI SELECT
     Toppings
  ========================= */

  const toggleTopping = (option) => {
    setSelections((previous) => {
      const alreadySelected = previous.toppings.some(
        (item) => item.id === option.id,
      );

      if (alreadySelected) {
        return {
          ...previous,
          toppings: previous.toppings.filter((item) => item.id !== option.id),
        };
      }

      return {
        ...previous,
        toppings: [...previous.toppings, option],
      };
    });
  };

  /* =========================
     STEP 1 — BASE
  ========================= */

  if (currentStep === 1) {
    return (
      <section className="builder-step">
        <div className="builder-step__header">
          <span className="builder-step__eyebrow">STEP 1</span>

          <h2>Choose Your Base</h2>

          <p>Pick the foundation of your perfect pizza.</p>
        </div>

        <div className="builder-step__grid">
          {baseOptions.map((option) => (
            <SelectionCard
              key={option.id}
              option={option}
              selected={selections.base?.id === option.id}
              onSelect={() => handleSingleSelection("base", option)}
            />
          ))}
        </div>
      </section>
    );
  }

  /* =========================
     STEP 2 — SAUCE
  ========================= */

  if (currentStep === 2) {
    return (
      <section className="builder-step">
        <div className="builder-step__header">
          <span className="builder-step__eyebrow">STEP 2</span>

          <h2>Pick Your Sauce</h2>

          <p>Choose the flavour that brings your pizza together.</p>
        </div>

        <div className="builder-step__grid">
          {sauceOptions.map((option) => (
            <SelectionCard
              key={option.id}
              option={option}
              selected={selections.sauce?.id === option.id}
              onSelect={() => handleSingleSelection("sauce", option)}
            />
          ))}
        </div>
      </section>
    );
  }

  /* =========================
     STEP 3 — CHEESE
  ========================= */

  if (currentStep === 3) {
    return (
      <section className="builder-step">
        <div className="builder-step__header">
          <span className="builder-step__eyebrow">STEP 3</span>

          <h2>Select Your Cheese</h2>

          <p>Finish your pizza with your favourite cheese.</p>
        </div>

        <div className="builder-step__grid">
          {cheeseOptions.map((option) => (
            <SelectionCard
              key={option.id}
              option={option}
              selected={selections.cheese?.id === option.id}
              onSelect={() => handleSingleSelection("cheese", option)}
            />
          ))}
        </div>
      </section>
    );
  }

  /* =========================
     STEP 4 — TOPPINGS
  ========================= */

  if (currentStep === 4) {
    return (
      <section className="builder-step">
        <div className="builder-step__header">
          <span className="builder-step__eyebrow">STEP 4</span>

          <h2>Add Your Toppings</h2>

          <p>Choose your favourites. Select as many as you like.</p>
        </div>

        <div className="builder-step__selection-info">
          <span>
            {selections.toppings.length}{" "}
            {selections.toppings.length === 1 ? "topping" : "toppings"} selected
          </span>
        </div>

        <div className="builder-step__grid">
          {toppingOptions.map((option) => (
            <ToppingCard
              key={option.id}
              topping={option}
              selected={selections.toppings.some(
                (item) => item.id === option.id,
              )}
              onToggle={() => toggleTopping(option)}
            />
          ))}
        </div>
      </section>
    );
  }

  /* =========================
     STEP 5 — REVIEW
  ========================= */

  if (currentStep === 5) {
    return <ReviewOrder selections={selections} />;
  }

  return null;
}

export default BuilderStep;
