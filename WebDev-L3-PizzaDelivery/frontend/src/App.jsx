import PublicLayout from "./layouts/Publiclayout";
import Login from "./pages/auth/login/Login";
import Register from "./pages/auth/Register/Register";
import Home from "./pages/public/home/Home";
import ForgotPassword from "./pages/auth/forgetPassword/ForgotPassword";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./pages/public/Menu/Menu";
import Checkout from "./pages/user/checkout/Checkout";
import Builder from "./pages/user/builder/Builder";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User */}
        <Route path="/builder" element={<Builder />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
