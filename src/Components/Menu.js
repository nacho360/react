import {Link} from "react-router-dom"
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'

function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">ECOMMERCE</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/registro">Registro</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;