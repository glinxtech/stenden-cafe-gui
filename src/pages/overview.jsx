import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import Cart from '../components/cart';

const Wrapper = styled.div`
  margin: 2rem auto;
  max-width: 90%;

  @media (min-width: 768px) {
    max-width: 80%;
  }
  @media (min-width: 1200px) {
    max-width: 60%;
  }
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

function OverviewPage() {
  return (
    <Wrapper>
      <Cart />
      <Options>
        <Button href="/">Go Back</Button>
        <Button href="/checkout">Pay</Button>
      </Options>
    </Wrapper>
  );
}

export default OverviewPage;
