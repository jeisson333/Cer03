import "./App.css";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import SignIn from "./pages/SignIn/SignIn";
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
    </Routes>
  );
}

export default App;
