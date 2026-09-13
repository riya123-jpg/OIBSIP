import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import QuickActions from "./components/QuickActions/QuickActions";
import CurrentOrder from "./components/CurrentOrder/CurrentOrder";
import RecentOrders from "./components/RecentOrders/RecentOrders";

import "./Dashboard.css";

const currentOrder = {
  id: "#SLY1024",
  item: "Custom Pizza",
  total: 349,
  status: "in_kitchen",
};

const recentOrders = [
  {
    id: "#SLY1021",
    item: "Margherita",
    total: 249,
    status: "Delivered",
  },
  {
    id: "#SLY1019",
    item: "Paneer Tikka",
    total: 319,
    status: "Delivered",
  },
  {
    id: "#SLY1017",
    item: "Farmhouse",
    total: 299,
    status: "Delivered",
  },
];

function Dashboard() {
  return (
    <main className="dashboard">
      <div className="dashboard__container">
        <DashboardHeader />

        <QuickActions />

        <CurrentOrder order={currentOrder} />

        <RecentOrders orders={recentOrders} />
      </div>
    </main>
  );
}

export default Dashboard;
