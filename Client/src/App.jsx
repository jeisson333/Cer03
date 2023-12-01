import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
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
import NewSales from "./pages/NewSales/NewSales";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import Error from "./pages/Error/Error";

function App() {
  const location = useLocation();
  const idBranch = "6f722d7f-515b-4705-a007-84b07317cc20"; //Api_key
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(
      location.pathname === "/contact" ||
        location.pathname === "/about" ||
        location.pathname === "/landingPage" ||
        location.pathname === "/" ||
        location.pathname === "/signin" ||
        location.pathname === "*"
    );
  }, [location]);

  const navClass = !isActive ? "siderBarPosition" : "prueba";

  return (
    <div className={navClass}>
      {!isActive && <NavBAr />}
      <Routes>
        {/* public */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* admin */}
        <Route element={<RequireAuth authRoles={["admin"]} />}>
          <Route path="/products" element={<Inventory />} />
          <Route path="/settings" element={<Settings idBranch={idBranch} />} />
          <Route
            path="/newProduct"
            element={<CreateProduct idBranch={idBranch} />}
          />
        </Route>

        {/* user */}
        <Route element={<RequireAuth authRoles={["user"]} />}>
          <Route path="/newsales" element={<NewSales idBranch={idBranch} />} />
          <Route path="/detail" element={<Detail idBranch={idBranch} />} />
        </Route>

        {/* admin and user */}
        <Route element={<RequireAuth authRoles={["admin", "user"]} />}>
          <Route path="/home" element={<Home idBranch={idBranch} />} />
        </Route>

        {/* sin nada */}
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/sales" element={<Sales idBranch={idBranch} />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/test" element={<Experiments />} />

        {/* 404 error */}
        <Route path="*" element={<Error setIsActive={setIsActive} />} />
      </Routes>
    </div>
  );
}

export default App;
