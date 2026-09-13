import "./pizzaCard.css";

function PizzaCard({ pizza, onAdd }) {
  const handleAdd = () => {
    onAdd?.(pizza);
  };

  return (
    <article className="pizza-card">
      <div className="pizza-card__image-wrapper">
        <img src={pizza.image} alt={pizza.name} className="pizza-card__image" />

        {pizza.tag && (
          <span className="pizza-card__badge">
            <span className="pizza-card__badge-dot" />
            {pizza.tag}
          </span>
        )}
      </div>

      <div className="pizza-card__content">
        <h3 className="pizza-card__name">{pizza.name}</h3>

        <p className="pizza-card__description">{pizza.description}</p>

        <div className="pizza-card__footer">
          <span className="pizza-card__price">₹{pizza.price}</span>

          <button
            type="button"
            className="pizza-card__add"
            onClick={handleAdd}
            aria-label={`Add ${pizza.name}`}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

export default PizzaCard;
