import { ArrowRight } from "lucide-react";

import "./RecentOrders.css";

function RecentOrders({ orders }) {
  return (
    <section className="recent-orders" id="orders">
      <div className="recent-orders__header">
        <div>
          <span className="recent-orders__eyebrow">ORDER HISTORY</span>

          <h2>Recent Orders</h2>
        </div>

        <a href="#orders">
          View All
          <ArrowRight size={15} />
        </a>
      </div>

      <div className="recent-orders__list">
        {orders.map((order) => (
          <div className="recent-order" key={order.id}>
            <div>
              <strong>{order.id}</strong>
              <span>{order.item}</span>
            </div>

            <strong>₹{order.total}</strong>

            <span className="recent-order__status">{order.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentOrders;
