import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
} from 'react-bootstrap';
import styled from 'styled-components';
import { CartContext } from '../components/cart.provider';
import Stepper from '../components/stepper';
import PaymentModal from '../components/payment-modal';

const StyledTable = styled(Table)`
  td {
    vertical-align: middle;
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
  const navigate = useNavigate();

  function total() {
    return cart.items.reduce((prevItem, curItem) => prevItem + (curItem.price * curItem.toPay), 0)
      .toLocaleString(undefined, {
        style: 'currency',
        currency: 'EUR',
      });
  }

  useEffect(() => {
    if (cart.done()) {
      cart.checkout();
      navigate('/');
    }
  }, [cart.items]);

  return (
    <Wrapper>
      <StyledTable striped>
        <thead>
          <tr>
            <th>Product</th>
            <th>Amount to pay</th>
            <th>Amount left</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cart.items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <Stepper
                  value={item.toPay}
                  max={(item.amount - item.paid)}
                  setValue={val => cart.setToPay(item.id, val)}
                />
              </td>
              <td>
                {item.amount - item.paid}
              </td>
              <td>
                {item.price.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'EUR',
                })}
              </td>
              <td>
                {(item.price * item.toPay)
                  .toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'EUR',
                  })}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">Total</td>
            <td>{total()}</td>
          </tr>
        </tbody>
      </StyledTable>
      <PaymentModal total={total()} onConfirm={cart.pay} />
    </Wrapper>
  );
}

export default CheckoutPage;
