import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Teste - Jeremias</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Item as={Link} className="nav-link" to="/">Inicio</Nav.Item>
                  <Nav.Item as={Link} className="nav-link" to="/tarefas">Tarefas</Nav.Item>
              </Nav>  
          </Navbar.Collapse> 
        </Navbar>
    </div>
  );
}

export default Header;