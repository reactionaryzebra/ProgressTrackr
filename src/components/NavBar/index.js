import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";

import * as ROUTES from "../../constants/routes";

const NavBar = () => (
  <nav>
    <NavLink to={ROUTES.REGISTER}>Register</NavLink>
    <NavLink to={ROUTES.HOME}>Home</NavLink>
    <NavLink to={ROUTES.LOGIN}>Login</NavLink>
    <LogoutButton />
  </nav>
);

export default NavBar;
