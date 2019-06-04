import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";
import { AuthUserContext } from "../Session";

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

const NavBar = ({ authUser }) => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavBarAuth /> : <NavBarNoAuth />)}
  </AuthUserContext.Consumer>
);

export default NavBar;
