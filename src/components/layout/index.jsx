import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './header';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex-grow: 1;
`;

function Layout({ children }) {
  return (
    <Wrapper>
      <Header />
      <Main>
        {children}
      </Main>
    </Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
