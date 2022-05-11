import React, { useContext } from 'react';
import {
  Table,
  Button,
} from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './cart.provider';

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

function Cart({ simple }) {
  const cart = useContext(CartContext);

  return (
    <StyledTable striped>
      <thead>
        <tr>
          <th><h3>Product</h3></th>
          <th><h3>Amount</h3></th>
          {!simple
          && (
            <>
              <th><h3>Price</h3></th>
              <th><h3>Total</h3></th>
            </>
          )}
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
            {!simple
            && (
              <>
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
              </>
            )}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
}

Cart.propTypes = {
  simple: PropTypes.bool,
};

Cart.defaultProps = {
  simple: false,
};

export default Cart;
