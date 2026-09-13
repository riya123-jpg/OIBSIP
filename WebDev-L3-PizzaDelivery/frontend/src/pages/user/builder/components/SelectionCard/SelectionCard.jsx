import { Check, Pizza, Droplets, Layers3 } from "lucide-react";

import "./SelectionCard.css";

function SelectionCard({ option, selected, onSelect }) {
  const iconMap = {
    base: Pizza,
    sauce: Droplets,
    cheese: Layers3,
  };

  const Icon = iconMap[option.category] || Pizza;

  return (
    <button
      type="button"
      className={[
        "selection-card",
        selected ? "selection-card--selected" : "",
      ].join(" ")}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <div className="selection-card__top">
        <div
          className={[
            "selection-card__visual",
            `selection-card__visual--${option.visualType}`,
          ].join(" ")}
        >
          <Icon size={23} strokeWidth={1.8} />
        </div>

        {selected && (
          <span className="selection-card__check">
            <Check size={14} strokeWidth={3} />
          </span>
        )}
      </div>

      <div className="selection-card__body">
        <h3>{option.name}</h3>

        <p>{option.description}</p>
      </div>

      <div className="selection-card__price">
        {option.price === 0 ? "Included" : `+₹${option.price}`}
      </div>
    </button>
  );
}

export default SelectionCard;
