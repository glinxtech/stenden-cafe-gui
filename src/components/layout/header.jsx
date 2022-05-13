import React from 'react';
import {
  Container,
  Nav,
  Navbar,
  NavbarBrand,
} from 'react-bootstrap';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginModal from './login-modal';
import LogoutButton from '../logout-button';
import Logo from './nhlogo.svg';

const Collapse = styled(Navbar.Collapse)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LoggedOutCollapse = styled(Navbar.Collapse)`
  align-items: center;
  justify-content: flex-end;
`;

const StyledNavBrand = styled(NavbarBrand)`
  font-size: 1.75rem;

  svg {
    height: 80px;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  font-size: 1.25rem;
`;

const LoggedInNav = styled(Nav)`
  margin-left: 1.5rem;

  .nav-item:not(:last-of-type) {
    margin-right: 1rem;
  }
`;

function LayoutHeader() {
  const isLoggedIn = !!localStorage.getItem('authToken');

  return (
    <Navbar as="header" bg="light" variant="light">
      <Container fluid>
        <StyledNavBrand as={Link} to="/">
          <Logo />
        </StyledNavBrand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {isLoggedIn ? (
          <Collapse id="basic-navbar-nav">
            <LoggedInNav>
              <Nav.Item>
                <StyledNavLink as={Link} to="/product">
                  Products
                </StyledNavLink>
              </Nav.Item>
              <Nav.Item>
                <StyledNavLink as={Link} to="/category">
                  Categories
                </StyledNavLink>
              </Nav.Item>
            </LoggedInNav>
            <Nav>
              <Nav.Item>
                <LogoutButton />
              </Nav.Item>
            </Nav>
          </Collapse>
        ) : (
          <LoggedOutCollapse>
            <Nav>
              <Nav.Item>
                <StyledNavLink as={Link} to="/register">Register</StyledNavLink>
              </Nav.Item>
              <Nav.Item>
                <LoginModal />
              </Nav.Item>
            </Nav>
          </LoggedOutCollapse>
        )}
      </Container>
    </Navbar>
  );
}

export default LayoutHeader;
