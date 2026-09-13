import { ArrowRight } from "lucide-react";

import "./DashboardHeader.css";

function DashboardHeader() {
  return (
    <section className="dashboard-header">
      <div className="dashboard-header__content">
        <span className="dashboard-header__eyebrow">YOUR DASHBOARD</span>

        <h1>
          Welcome back, <span>Pizza Lover.</span>
        </h1>

        <p>
          Ready for your next pizza? Build something new or check your latest
          order.
        </p>
      </div>

      <a href="/builder" className="dashboard-header__button">
        Build Your Pizza
        <ArrowRight size={17} />
      </a>
    </section>
  );
}

export default DashboardHeader;
