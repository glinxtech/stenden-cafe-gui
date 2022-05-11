import React from 'react';
import {
  Button,
  Stack,
} from 'react-bootstrap';
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

const Options = styled(Stack)`
  gap: 1rem;
  > Button:nth-child(2) {
      margin-left: auto;
  }
`;

function OverviewPage() {
  return (
    <Wrapper>
      <Cart />
      <Options direction="horizontal">
        <Button href="/">Go Back</Button>
        <Button>Pay All</Button>
        <Button href="/checkout">Pay Per Person</Button>
      </Options>
    </Wrapper>
  );
}

export default OverviewPage;
