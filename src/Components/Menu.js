import React, { useContext } from "react"
import {Link} from "react-router-dom"
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap'
import EcommerceContext from "../Context/ecommerceContext";

function Menu() {
  const context = useContext(EcommerceContext)
  const handleClick = () => {
    context.logoutUser()
    
  }

  return (
    <EcommerceContext.Consumer>
      { context =>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">ECOMMERCE</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
              !context.userLogin &&
              <>
              <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            }
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            {
              context.userLogin &&
              <>
              <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link>
              <Nav.Link as={Link} onClick={handleClick} to="/login">Salir</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      }
    </EcommerceContext.Consumer>
  );
}

export default Menu;