import { Search, ShoppingCart } from "lucide-react";

import { useState, useMemo } from "react";

import PizzaCard from "../../../components/pizza/Pizzacard";

import margheritaImage from "../../../assets/images/pizzas/pizza_1.png";
import farmhouseImage from "../../../assets/images/pizzas/pizza_2.png";
import paneerTikkaImage from "../../../assets/images/pizzas/pizza_3.png";
import mexicanVeggieImage from "../../../assets/images/pizzas/pizza_4.png";
import cheeseOverloadImage from "../../../assets/images/pizzas/pizza_5.png";
import veggieSupremeImage from "../../../assets/images/pizzas/pizza_6.png";

import "./Menu.css";

const pizzas = [
  {
    id: "margherita",
    name: "Margherita",
    description: "Classic tomato, mozzarella and fresh basil pizza.",
    image: margheritaImage,
    price: 249,
    tag: "VEG",
  },
  {
    id: "farmhouse",
    name: "Farmhouse",
    description: "Loaded with onion, capsicum, tomato and mushroom.",
    image: farmhouseImage,
    price: 299,
    tag: "VEG",
  },
  {
    id: "paneer-tikka",
    name: "Paneer Tikka",
    description: "Spiced paneer, onion and capsicum with creamy sauce.",
    image: paneerTikkaImage,
    price: 319,
    tag: "VEG",
  },
  {
    id: "mexican-veggie",
    name: "Mexican Veggie",
    description: "Spicy sauce, jalapeno, sweet corn, capsicum and olives.",
    image: mexicanVeggieImage,
    price: 309,
    tag: "VEG",
  },
  {
    id: "cheese-overload",
    name: "Cheese Overload",
    description: "A rich blend of mozzarella, cheddar and four-cheese mix.",
    image: cheeseOverloadImage,
    price: 349,
    tag: "VEG",
  },
  {
    id: "veggie-supreme",
    name: "Veggie Supreme",
    description: "A loaded combination of fresh vegetables and olives.",
    image: veggieSupremeImage,
    price: 329,
    tag: "VEG",
  },
];

function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const filteredPizzas = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) {
      return pizzas;
    }

    return pizzas.filter((pizza) => {
      return (
        pizza.name.toLowerCase().includes(normalizedSearch) ||
        pizza.description.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [searchTerm]);

  const handleAddToCart = () => {
    setCartCount((currentCount) => currentCount + 1);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <main className="menu-page">
      <section className="menu-page__header">
        <div className="container">
          <div className="menu-page__breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            <span>Menu</span>
          </div>

          <div className="menu-page__header-row">
            <div>
              <span className="menu-page__eyebrow">EXPLORE SLICEORY</span>

              <h1 className="menu-page__title">Our Full Menu</h1>

              <p className="menu-page__description">
                Handcrafted pizzas made with fresh ingredients, delivered hot.
              </p>
            </div>

            <button
              type="button"
              className="menu-page__cart"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingCart size={19} />

              {cartCount > 0 && (
                <span className="menu-page__cart-count">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </section>

      <section className="menu-page__content">
        <div className="container">
          <div className="menu-page__toolbar">
            <div className="menu-page__search">
              <Search size={18} />

              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search pizzas..."
                aria-label="Search pizzas"
              />

              {searchTerm && (
                <button
                  type="button"
                  className="menu-page__search-clear"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="menu-page__filters">
              <button
                type="button"
                className="menu-page__filter menu-page__filter--active"
              >
                All
              </button>

              <button type="button" className="menu-page__filter">
                Veg
              </button>
            </div>
          </div>

          {filteredPizzas.length > 0 ? (
            <div className="menu-page__grid">
              {filteredPizzas.map((pizza) => (
                <PizzaCard
                  key={pizza.id}
                  pizza={pizza}
                  onAdd={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="menu-page__empty">
              <div className="menu-page__empty-icon">
                <Search size={26} />
              </div>

              <h2>No pizzas found</h2>

              <p>We couldn't find a pizza matching "{searchTerm}".</p>

              <button
                type="button"
                onClick={clearSearch}
                className="menu-page__empty-button"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Menu;
