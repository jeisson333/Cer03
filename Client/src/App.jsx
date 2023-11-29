import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Inventory from "./pages/Inventory/Inventory";
import LandingPage from "./pages/LandingPage/LandingPage";
import RegisterForm from "./pages/RegisterForm/RegisterForm";
import About from "./pages/About/About";
import SignIn from "./pages/SignIn/SignIn";
import Contact from "./pages/Contact/Contact";
import Sales from "./pages/Sales/Sales";
import Settings from "./pages/Settings/Settings";
import NavBAr from "./components/NavBar/NavBar";
import { CreateProduct } from "./pages/Forms/CreateProduct";
import Detail from "./pages/Detail/Detail";
import Experiments from "./pages/Experiments/Experiments";

function App() {
  const location = useLocation();
  const idBranch = "6f722d7f-515b-4705-a007-84b07317cc20"; //Api_key
  // const [isActive, setIsActive] = useState(false)

  const isActive =
    location.pathname === "/contact" ||
    location.pathname === "/about" ||
    location.pathname === "/landingPage" ||
    location.pathname === "/" ||
    location.pathname === "/signIn";

  const navClass = !isActive ? "siderBarPosition" : "prueba";

  return (
    <div className={navClass}>
      {!isActive && <NavBAr />}
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/home" element={<Home idBranch={idBranch} />} />
        <Route path="/products" element={<Inventory idBranch={idBranch} />} />
        <Route path="/settings" element={<Settings idBranch={idBranch} />} />
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/detail" element={<Detail idBranch={idBranch} />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sales" element={<Sales idBranch={idBranch} />} />
        <Route
          path="/newProduct"
          element={<CreateProduct idBranch={idBranch} />}
        />
        <Route path="/test" element={<Experiments />} />
      </Routes>
    </div>
  );
}

export default App;
