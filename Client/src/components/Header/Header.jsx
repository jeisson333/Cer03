import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../image/logocer03.jpeg";

const Header = () => {
  return (
    <nav className="bg-blue-900 p-4 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <img
            className="h-20 w-auto max-w-full flex-shrink-0 ml-0"
            src={logo}
            alt="Cer03"
          />
        </div>

        <div className="flex items-center space-x-6">
          <NavLink
            to="/about"
            className="text-white hover:text-blue-300 text-sm"
          >
            Sobre Nosotros
          </NavLink>

          <NavLink
            to="/contact"
            className="text-white hover:text-blue-300 text-sm"
          >
            Contáctanos ✆
          </NavLink>

          <NavLink to="/signIn">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              Log In
            </button>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
