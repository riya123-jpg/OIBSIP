import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import HowItWorks from "./components/HowItWorks/HowItWorks";
import PizzaSection from "./components/pizzaSection/PizzaSection";

import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Hero />

      <PizzaSection />
      <HowItWorks />
      <Footer />
    </div>
  );
}

export default Home;
