import OrderReview from "./components/OrderReview";
import PriceSummary from "./components/PriceSummary";

import "./Checkout.css";

const checkoutOrder = {
  id: "#SLY1024",
  pizza: {
    name: "Custom Pizza",
    base: "Classic Hand Tossed",
    sauce: "Tomato",
    cheese: "Mozzarella",
    toppings: ["Onion", "Capsicum", "Olives"],
  },
  quantity: 1,
  price: 349,
};

function Checkout() {
  return (
    <main className="checkout-page">
      <div className="checkout-page__container">
        <header className="checkout-page__header">
          <div>
            <span className="checkout-page__eyebrow">CHECKOUT</span>

            <h1>Review Your Order</h1>

            <p>Everything looks good? You're one step away from your pizza.</p>
          </div>

          <span className="checkout-page__order-id">{checkoutOrder.id}</span>
        </header>

        <div className="checkout-page__layout">
          <OrderReview order={checkoutOrder} />

          <PriceSummary order={checkoutOrder} />
        </div>
      </div>
    </main>
  );
}

export default Checkout;
