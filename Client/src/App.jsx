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
import SignUp from "./pages/SignUp/SignUp";
import Contact from "./pages/Contact/Contact";
import Settings from "./pages/Settings/Settings";
import NavBAr from "./components/NavBar/NavBar";
import { CreateProduct } from "./pages/Forms/CreateProduct";
import Detail from "./pages/Detail/Detail";
import Experiments from "./pages/Experiments/Experiments";
import NewSales from "./pages/NewSales/NewSales";
import RequireAuth from "./pages/RequireAuth/RequireAuth";
import Error from "./pages/Error/Error";
import { changeSidebar } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Subscription from "./pages/Subscription/Subscription";
import SubscriptionCheckout from "./pages/SubscriptionCheckout/SubscriptionCheckout";
import SubscriptionSuccess from "./pages/SubscriptionCheckout/SubscriptionSuccess";
import SubscriptionFailure from "./pages/SubscriptionCheckout/SubscriptionFailure";
import SubscriptionPending from "./pages/SubscriptionCheckout/SubscriptionPending";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { sidebarActive } = useSelector((state) => state);
  const withSide = [
    "/products",
    "/settings",
    "/newProduct",
    "/newsales",
    "/home",
    "/detail/",
    "/subscription",
    "/subscription/checkout",
    "/subscription/success",
    "/subscription/failure",
    "/subscription/pending",
  ];
  const withoutSide = ["/", "/contact", "/about", "/landingPage", "/signIn"];

  useEffect(() => {
    if (withoutSide.find((route) => route === location.pathname)) {
      dispatch(changeSidebar(false));
    } else if (withSide.find((route) => route === location.pathname)) {
      dispatch(changeSidebar(true));
    } else {
      dispatch(changeSidebar(false));
    }
  }, [location.pathname]);

  const navClass = sidebarActive ? "siderBarPosition" : "prueba";

  return (
    <div className={navClass}>
      {sidebarActive && <NavBAr />}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* public */}
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* admin */}
        <Route element={<RequireAuth authRoles={["admin"]} />}>
          <Route path="/products" element={<Inventory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/newProduct" element={<CreateProduct />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route
            path="/subscription/checkout"
            element={<SubscriptionCheckout />}
          />
          <Route
            path="/subscription/success"
            element={<SubscriptionSuccess />}
          />
          <Route
            path="/subscription/failure"
            element={<SubscriptionFailure />}
          />
          <Route
            path="/subscription/pending"
            element={<SubscriptionPending />}
          />
        </Route>
        {/* user */}
        <Route element={<RequireAuth authRoles={["user"]} />}>
          <Route path="/newsales" element={<NewSales />} />
        </Route>
        {/* admin and user */}
        <Route element={<RequireAuth authRoles={["admin", "user"]} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
        {/* sin nada */}
        <Route path="/registerForm" element={<RegisterForm />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/test" element={<Experiments />} />
        {/* 404 error */}
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
