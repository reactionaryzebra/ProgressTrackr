import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";
import { withAuthUser } from "../Session";
import NavigationBar from "../../Styles/NavigationBar";

import * as ROUTES from "../../constants/routes";

const NavBarAuth = () => (
  <NavigationBar>
    <NavLink to={ROUTES.HOME}>Home</NavLink>
    <LogoutButton />
  </NavigationBar>
);

const NavBarNoAuth = () => (
  <NavigationBar>
    <NavLink to={ROUTES.LOGIN}>Login</NavLink>
    <NavLink to={ROUTES.REGISTER}>Register</NavLink>
  </NavigationBar>
);

const NavBarBase = ({ authUser }) =>
  authUser ? <NavBarAuth /> : <NavBarNoAuth />;

const NavBar = withAuthUser(NavBarBase);

export default NavBar;
