import { ChefHat, ShoppingBag, ClipboardList } from "lucide-react";

import "./QuickActions.css";

const actions = [
  {
    title: "Build a Pizza",
    description: "Create your own custom pizza.",
    href: "/builder",
    icon: ChefHat,
  },
  {
    title: "Explore Menu",
    description: "Browse our signature pizzas.",
    href: "/menu",
    icon: ShoppingBag,
  },
  {
    title: "My Orders",
    description: "View your order history.",
    href: "#orders",
    icon: ClipboardList,
  },
];

function QuickActions() {
  return (
    <section className="quick-actions">
      {actions.map((action) => {
        const Icon = action.icon;

        return (
          <a key={action.title} href={action.href} className="quick-action">
            <div className="quick-action__icon">
              <Icon size={20} />
            </div>

            <div className="quick-action__content">
              <h2>{action.title}</h2>
              <p>{action.description}</p>
            </div>
          </a>
        );
      })}
    </section>
  );
}

export default QuickActions;
