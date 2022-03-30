import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
} from 'react-bootstrap';
import styled from 'styled-components';
import Logo from './nhlogo.svg';

const StyledNavBrand = styled(NavbarBrand)`
  font-size: 1.75rem;

  svg {
    height: 80px;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  font-size: 1.25rem;
`;

function LayoutHeader() {
  return (
    <Navbar as="header" bg="light" variant="light">
      <Container fluid>
        <StyledNavBrand href="">
          <Logo />
        </StyledNavBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <StyledNavLink href="">Create</StyledNavLink>
            <StyledNavLink href="">Update</StyledNavLink>
            <StyledNavLink href="">Delete</StyledNavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LayoutHeader;
