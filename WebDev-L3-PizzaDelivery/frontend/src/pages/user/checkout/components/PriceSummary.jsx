import { ShieldCheck, ArrowRight } from "lucide-react";

import "./PriceSummary.css";

function PriceSummary({ order }) {
  const subtotal = order.price * order.quantity;
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <aside className="price-summary">
      <div className="price-summary__header">
        <span className="price-summary__eyebrow">ORDER SUMMARY</span>

        <h2>Your Total</h2>
      </div>

      <div className="price-summary__rows">
        <div>
          <span>Custom Pizza × {order.quantity}</span>
          <strong>₹{subtotal}</strong>
        </div>

        <div>
          <span>Delivery</span>
          <strong className="price-summary__free">FREE</strong>
        </div>
      </div>

      <div className="price-summary__total">
        <span>Total</span>
        <strong>₹{total}</strong>
      </div>

      <button type="button" className="price-summary__button">
        Proceed to Payment
        <ArrowRight size={17} />
      </button>

      <div className="price-summary__secure">
        <ShieldCheck size={16} />

        <p>Secure payment powered by Razorpay.</p>
      </div>
    </aside>
  );
}

export default PriceSummary;
