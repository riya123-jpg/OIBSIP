import { Check, ChefHat, Truck } from "lucide-react";

import "./CurrentOrder.css";

const statuses = [
  {
    key: "received",
    label: "Order Received",
    icon: Check,
  },
  {
    key: "in_kitchen",
    label: "In Kitchen",
    icon: ChefHat,
  },
  {
    key: "sent_to_delivery",
    label: "Sent to Delivery",
    icon: Truck,
  },
];

function CurrentOrder({ order }) {
  const currentIndex = statuses.findIndex(
    (status) => status.key === order.status,
  );

  return (
    <section className="current-order">
      <div className="current-order__header">
        <div>
          <span className="current-order__eyebrow">CURRENT ORDER</span>

          <h2>{order.id}</h2>
        </div>

        <span className="current-order__status">
          {statuses[currentIndex]?.label || "Processing"}
        </span>
      </div>

      <div className="current-order__details">
        <div>
          <span>Item</span>
          <strong>{order.item}</strong>
        </div>

        <div>
          <span>Total</span>
          <strong>₹{order.total}</strong>
        </div>
      </div>

      <div className="order-tracking">
        {statuses.map((status, index) => {
          const Icon = status.icon;

          const isCompleted = index <= currentIndex;

          const isCurrent = index === currentIndex;

          return (
            <div className="order-tracking__item" key={status.key}>
              <div className="order-tracking__marker-row">
                <div
                  className={[
                    "order-tracking__marker",
                    isCompleted ? "order-tracking__marker--active" : "",
                    isCurrent ? "order-tracking__marker--current" : "",
                  ].join(" ")}
                >
                  <Icon size={15} />
                </div>

                {index < statuses.length - 1 && (
                  <div
                    className={[
                      "order-tracking__line",
                      index < currentIndex
                        ? "order-tracking__line--active"
                        : "",
                    ].join(" ")}
                  />
                )}
              </div>

              <span>{status.label}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CurrentOrder;
