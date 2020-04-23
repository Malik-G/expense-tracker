import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class NavBar extends Component {
  state = {
    isOpen: true,
  }

  toggle = () => {
    return
  }

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <NavbarBrand href="/">$ta$h</NavbarBrand>
          <Nav tabs={true} className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
            <NavItem>
              <NavLink href="/expenses">Expenses</NavLink>
            </NavItem>
              <NavItem>
                <NavLink href="/categories">Categories</NavLink>
              </NavItem>

            
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBar;