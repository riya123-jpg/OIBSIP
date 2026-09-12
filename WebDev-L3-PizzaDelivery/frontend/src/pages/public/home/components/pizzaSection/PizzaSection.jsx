import PizzaCard from "../../../../../components/pizza/Pizzacard";
import "./PizzaSection.css";

import margheritaImage from "../../../../../assets/images/pizzas/pizza_1.png";
import farmhouseImage from "../../../../../assets/images/pizzas/pizza_2.png";
import paneerTikkaImage from "../../../../../assets/images/pizzas/pizza_3.png";
import mexicanVeggieImage from "../../../../../assets/images/pizzas/pizza_4.png";
import cheeseOverloadImage from "../../../../../assets/images/pizzas/pizza_5.png";
import veggieSupremeImage from "../../../../../assets/images/pizzas/pizza_6.png";

const pizzaPreviewData = [
  {
    name: "Margherita",
    description: "Classic tomato, mozzarella and fresh basil pizza.",
    image: margheritaImage,
    price: 249,
    tag: "VEG",
  },
  {
    name: "Farmhouse",
    description: "Loaded with onion, capsicum, tomato and mushroom.",
    image: farmhouseImage,
    price: 299,
    tag: "VEG",
  },
  {
    name: "Paneer Tikka",
    description: "Spiced paneer, onion and capsicum with creamy sauce.",
    image: paneerTikkaImage,
    price: 319,
    tag: "VEG",
  },
  {
    name: "Mexican Veggie",
    description: "Spicy sauce, jalapeno, sweet corn, capsicum and olives.",
    image: mexicanVeggieImage,
    price: 309,
    tag: "VEG",
  },
  {
    name: "Cheese Overload",
    description: "A rich blend of mozzarella, cheddar and four-cheese mix.",
    image: cheeseOverloadImage,
    price: 349,
    tag: "VEG",
  },
  {
    name: "Veggie Supreme",
    description: "A loaded combination of fresh vegetables and olives.",
    image: veggieSupremeImage,
    price: 329,
    tag: "VEG",
  },
];

function PizzaSection() {
  const featuredPizzas = pizzaPreviewData.slice(0, 4);

  return (
    <section className="pizza-section" id="menu">
      <div className="container">
        <div className="pizza-section__header">
          <div className="pizza-section__heading">
            <span className="pizza-section__eyebrow">OUR BESTSELLERS</span>

            <h2 className="pizza-section__title">Our Signature Pizzas</h2>

            <p className="pizza-section__description">
              Handpicked favourites, made fresh every time.
            </p>
          </div>

          <a href="#full-menu" className="pizza-section__link">
            View Full Menu
            <span>→</span>
          </a>
        </div>

        <div className="pizza-section__grid">
          {featuredPizzas.map((pizza) => (
            <PizzaCard key={pizza.name} pizza={pizza} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PizzaSection;
