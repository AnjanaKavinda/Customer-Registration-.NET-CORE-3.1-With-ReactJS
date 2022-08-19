import React from 'react'
import '../Styles/css/main.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import {
  Link
} from "react-router-dom";


function NavbarComponent() {
  return (
   <>
        <Navbar bg="dark" variant="dark">
            <Container>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/">customers</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
   </>
  )
}

export default NavbarComponent