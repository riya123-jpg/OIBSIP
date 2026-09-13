import { Pizza, Minus, Plus, Check } from "lucide-react";

import "./OrderReview.css";

function OrderReview({ order }) {
  const { pizza, quantity } = order;

  return (
    <section className="order-review">
      <div className="order-review__header">
        <div>
          <span className="order-review__eyebrow">YOUR ORDER</span>

          <h2>Custom Pizza</h2>
        </div>

        <div className="order-review__pizza-icon">
          <Pizza size={20} />
        </div>
      </div>

      <div className="order-review__pizza"> 
        <div className="order-review__pizza-info">
          <h3>{pizza.name}</h3>

          <p>Built just the way you like it.</p>
        </div>
      </div>

      <div className="order-review__selections">
        <div className="order-review__selection">
          <span>Base</span>

          <strong>{pizza.base}</strong>
        </div>

        <div className="order-review__selection">
          <span>Sauce</span>

          <strong>{pizza.sauce}</strong>
        </div>

        <div className="order-review__selection">
          <span>Cheese</span>

          <strong>{pizza.cheese}</strong>
        </div>

        <div className="order-review__selection order-review__selection--toppings">
          <span>Toppings</span>

          <div className="order-review__toppings">
            {pizza.toppings.map((topping) => (
              <span key={topping}>
                <Check size={11} />
                {topping}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="order-review__footer">
        <div>
          <span>Quantity</span>

          <p>How many pizzas?</p>
        </div>

        <div className="order-review__quantity">
          <button type="button" aria-label="Decrease quantity">
            <Minus size={15} />
          </button>

          <strong>{quantity}</strong>

          <button type="button" aria-label="Increase quantity">
            <Plus size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default OrderReview;
