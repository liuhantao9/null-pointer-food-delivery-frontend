import Navbar from "react-bootstrap/Navbar";
import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import NonLoginNavbarItems from "./NonLoginNavbarItems";
import { GlobalContext } from "../../../GlobalContext";
import CustomerNavbarItems from "./CustomerNavbarItems";
import RestaurantNavbarItems from "./RestaurantNavbarItems";
import DriverNavbarItems from "./DriverNavbarItems";
import { Link } from "react-router-dom";
export default function MainNavbar() {
  const { userInfo } = useContext(GlobalContext);
  let navItems = null;
  if (userInfo === null) {
    navItems = <NonLoginNavbarItems />;
  } else {
    const userType = userInfo.type;
    switch (userType) {
      case "CUSTOMER":
        navItems = <CustomerNavbarItems />;
        break;
      case "RESTAURANT":
        navItems = <RestaurantNavbarItems />;
        break;
      case "DRIVER":
        navItems = <DriverNavbarItems />;
        break;
      default:
        navItems = null;
    }
  }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        <Nav.Link as={Link} to="/home">
          NullPointer
        </Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/home">
            Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {navItems}
    </Navbar>
  );
}
