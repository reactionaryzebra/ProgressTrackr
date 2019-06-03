import React from "react";
import { NavLink } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

const NavBar = () => (
  <nav>
    <NavLink to={ROUTES.REGISTER}>Register</NavLink>
    <NavLink to={ROUTES.HOME}>Home</NavLink>
    <NavLink to={ROUTES.LOGIN}>Login</NavLink>
  </nav>
);

export default NavBar;
