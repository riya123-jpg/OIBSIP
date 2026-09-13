import { Check } from "lucide-react";

import "./ToppingCard.css";

function ToppingCard({ topping, selected, onToggle }) {
  return (
    <button
      type="button"
      className={[
        "topping-card",
        selected ? "topping-card--selected" : "",
      ].join(" ")}
      onClick={onToggle}
      aria-pressed={selected}
    >
      <div
        className={[
          "topping-card__visual",
          `topping-card__visual--${topping.visualType}`,
        ].join(" ")}
      >
        <span aria-hidden="true">{topping.emoji}</span>
      </div>

      <div className="topping-card__content">
        <h3>{topping.name}</h3>

        <p>{topping.description}</p>

        <strong>+₹{topping.price}</strong>
      </div>

      {selected && (
        <div className="topping-card__check">
          <Check size={14} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}

export default ToppingCard;
