import { Check, Pencil, Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ReviewOrder.css";

function ReviewOrder({ selections }) {
  const navigate = useNavigate();
  const toppings = selections.toppings || [];

  const basePrice = selections.base?.price || 0;
  const saucePrice = selections.sauce?.price || 0;
  const cheesePrice = selections.cheese?.price || 0;

  const toppingsPrice = toppings.reduce(
    (total, topping) => total + (topping.price || 0),
    0,
  );

  const pizzaPrice = 249 + basePrice + saucePrice + cheesePrice + toppingsPrice;

  return (
    <section className="review-order">
      <div className="review-order__header">
        <span className="review-order__eyebrow">FINAL REVIEW</span>

        <h2>Your Pizza Is Ready</h2>

        <p>Review your selections before continuing to checkout.</p>
      </div>

      <div className="review-order__sections">
        {/* Base */}
        <div className="review-order__item">
          <div className="review-order__item-info">
            <div className="review-order__check">
              <Check size={14} strokeWidth={3} />
            </div>

            <div>
              <span>Base</span>
              <strong>{selections.base?.name || "Not selected"}</strong>
            </div>
          </div>

          <div className="review-order__item-action">
            <span>+₹{basePrice}</span>

            <button type="button" aria-label="Edit base">
              <Pencil size={14} />
            </button>
          </div>
        </div>

        {/* Sauce */}
        <div className="review-order__item">
          <div className="review-order__item-info">
            <div className="review-order__check">
              <Check size={14} strokeWidth={3} />
            </div>

            <div>
              <span>Sauce</span>
              <strong>{selections.sauce?.name || "Not selected"}</strong>
            </div>
          </div>

          <div className="review-order__item-action">
            <span>+₹{saucePrice}</span>

            <button type="button" aria-label="Edit sauce">
              <Pencil size={14} />
            </button>
          </div>
        </div>

        {/* Cheese */}
        <div className="review-order__item">
          <div className="review-order__item-info">
            <div className="review-order__check">
              <Check size={14} strokeWidth={3} />
            </div>

            <div>
              <span>Cheese</span>
              <strong>{selections.cheese?.name || "Not selected"}</strong>
            </div>
          </div>

          <div className="review-order__item-action">
            <span>+₹{cheesePrice}</span>

            <button type="button" aria-label="Edit cheese">
              <Pencil size={14} />
            </button>
          </div>
        </div>

        {/* Toppings */}
        <div className="review-order__item review-order__item--toppings">
          <div className="review-order__item-info">
            <div className="review-order__check">
              <Check size={14} strokeWidth={3} />
            </div>

            <div>
              <span>Toppings</span>

              <strong>
                {toppings.length > 0
                  ? toppings.map((item) => item.name).join(", ")
                  : "No toppings"}
              </strong>
            </div>
          </div>

          <div className="review-order__item-action">
            <span>+₹{toppingsPrice}</span>

            <button type="button" aria-label="Edit toppings">
              <Pencil size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Quantity */}
      <div className="review-order__quantity">
        <div>
          <span>Quantity</span>
          <p>How many pizzas would you like?</p>
        </div>

        <div className="review-order__quantity-control">
          <button type="button" aria-label="Decrease quantity">
            <Minus size={15} />
          </button>

          <strong>1</strong>

          <button type="button" aria-label="Increase quantity">
            <Plus size={15} />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="review-order__price">
        <div>
          <span>Pizza Total</span>
          <small>Before payment</small>
        </div>

        <strong>₹{pizzaPrice}</strong>
      </div>

      <button
        type="button"
        className="review-order__checkout"
        onClick={() => navigate("/checkout")}
      >
        Continue to Checkout
        <span>→</span>
      </button>
    </section>
  );
}

export default ReviewOrder;
