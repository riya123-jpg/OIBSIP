import heroPizza from "../../../../../assets/images/pizzas/pizza_7.png";

import "./PizzaPreview.css";

function PizzaPreview({ selections, totalPrice }) {
  const selectedBase = selections.base;
  const selectedSauce = selections.sauce;
  const selectedCheese = selections.cheese;

  const baseClass = selectedBase?.id
    ? `pizza-preview__pizza--${selectedBase.id}`
    : "";

  const sauceClass = selectedSauce?.id
    ? `pizza-preview__sauce-overlay--${selectedSauce.id}`
    : "";

  const cheeseClass = selectedCheese?.id
    ? `pizza-preview__cheese-overlay--${selectedCheese.id}`
    : "";

  return (
    <aside className="pizza-preview">
      <div className="pizza-preview__visual">
        <div className="pizza-preview__visual-header">
          <div className="pizza-preview__live-badge">
            <span className="pizza-preview__live-dot" />
            Live Preview
          </div>

          <div className="pizza-preview__illustrative-badge">
            <strong>Illustrative view</strong>
            <span>Actual product may vary</span>
          </div>
        </div>

        <div className={["pizza-preview__pizza", baseClass].join(" ")}>
          <img
            src={heroPizza}
            alt="Illustrative pizza preview"
            className="pizza-preview__image"
          />

          {selectedSauce && (
            <div
              className={["pizza-preview__sauce-overlay", sauceClass].join(" ")}
            />
          )}

          {selectedCheese && (
            <div
              className={["pizza-preview__cheese-overlay", cheeseClass].join(
                " ",
              )}
            />
          )}

          {selections.toppings.length > 0 && (
            <div className="pizza-preview__toppings">
              {selections.toppings.map((topping, index) => (
                <span
                  key={topping.id}
                  className={[
                    "pizza-preview__topping",
                    `pizza-preview__topping--${topping.visualType}`,
                    `pizza-preview__topping--position-${index + 1}`,
                  ].join(" ")}
                  title={topping.name}
                  aria-label={topping.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pizza-preview__summary">
        <span className="pizza-preview__summary-label">YOUR PIZZA</span>

        <div className="pizza-preview__selection">
          <p>
            <span>Base</span>
            <strong>{selectedBase?.name || "Not selected"}</strong>
          </p>

          <p>
            <span>Sauce</span>
            <strong>{selectedSauce?.name || "Not selected"}</strong>
          </p>

          <p>
            <span>Cheese</span>
            <strong>{selectedCheese?.name || "Not selected"}</strong>
          </p>

          <p>
            <span>Toppings</span>
            <strong>
              {selections.toppings.length
                ? `${selections.toppings.length} selected`
                : "None"}
            </strong>
          </p>
        </div>

        <div className="pizza-preview__price">
          <span>Current Price</span>
          <strong>₹{totalPrice}</strong>
        </div>
      </div>
    </aside>
  );
}

export default PizzaPreview;
