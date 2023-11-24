import "./App.css";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import About from "./pages/About/About"
import SignIn from "./pages/SignIn/SignIn";
import Contact from "./pages/Contact/Contact"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/home" element={<Home />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route exact path="/landingPage" element={<LandingPage />} />
      <Route path="/registerForm" element={<RegisterForm />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
  );
}

export default App;
