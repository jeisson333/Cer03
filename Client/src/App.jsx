import "./App.css";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import About from "./pages/About/About"
import SignIn from "./pages/SignIn/SignIn";
import Contact from "./pages/Contact/Contact"
import { Route, Routes, useLocation } from "react-router-dom";
import Settings from "./pages/Settings/Settings";
import NavBAr from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  const isActive  = location.pathname === '/contact' || location.pathname === '/about' || location.pathname === '/landingPage' ||  location.pathname === '/' ;
  return (
    <div className="siderBarPosition">
      {!isActive && <NavBAr/>}
      <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Inventory />} />
      <Route path="/settings" element={<Settings />} />
      <Route exact path="/" element={<LandingPage />} />
      <Route path="/registerForm" element={<RegisterForm />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
    </div>
  );
}

export default App;
