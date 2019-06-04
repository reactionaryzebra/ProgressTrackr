import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";
import { withAuthUser } from "../Session";

import * as ROUTES from "../../constants/routes";

const NavBarAuth = () => (
  <nav>
    <NavLink to={ROUTES.HOME}>Home</NavLink>
    <LogoutButton />
  </nav>
);

const NavBarNoAuth = () => (
  <nav>
    <NavLink to={ROUTES.LOGIN}>Login</NavLink>
    <NavLink to={ROUTES.REGISTER}>Register</NavLink>
  </nav>
);

const NavBarBase = ({ authUser }) =>
  authUser ? <NavBarAuth /> : <NavBarNoAuth />;

const NavBar = withAuthUser(NavBarBase);

export default NavBar;
