import React, { useContext } from 'react';
import {
  Table,
  Button,
} from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../components/cart.provider';

const StyledTable = styled(Table)`
  td {
    vertical-align: middle;
  }
`;

const Amount = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

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

function CheckoutPage() {
  const cart = useContext(CartContext);

  return (
    <Wrapper>
      <StyledTable striped>
        <thead>
          <tr>
            <th><h3>Product</h3></th>
            <th><h3>Amount</h3></th>
            <th><h3>Price</h3></th>
            <th><h3>Total</h3></th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <Amount>
                  {item.amount > 1
                    ? (
                      <Button onClick={() => cart.setAmount(item.id, (item.amount - 1))}>
                        <FontAwesomeIcon icon={faMinus} />
                      </Button>
                    )
                    : (
                      <Button onClick={() => cart.remove(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    )}
                  <p>{item.amount}</p>
                  <Button onClick={() => cart.setAmount(item.id, (item.amount + 1))}>
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                </Amount>
              </td>
              <td>
                {item.price.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </td>
              <td>
                {(item.price * item.amount)
                  .toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'EUR',
                  })}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
}

export default CheckoutPage;
