import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../Logout";
import { withAuthUser } from "../Session";
import NavigationBar from "../../styles/NavigationBar";

import * as ROUTES from "../../constants/routes";

const NavBarAuth = () => (
  <NavigationBar>
    <div>Progress Trackr</div>
    <div>
      <NavLink to={ROUTES.HOME}>Home</NavLink>
      <LogoutButton />
    </div>
  </NavigationBar>
);

const NavBarNoAuth = () => (
  <NavigationBar>
    <div>Progress Trackr</div>
    <div>
      <NavLink to={ROUTES.LOGIN}>Login</NavLink>
      <NavLink to={ROUTES.REGISTER}>Register</NavLink>
    </div>
  </NavigationBar>
);

const NavBarBase = ({ authUser }) =>
  authUser ? <NavBarAuth /> : <NavBarNoAuth />;

const NavBar = withAuthUser(NavBarBase);

export default NavBar;
