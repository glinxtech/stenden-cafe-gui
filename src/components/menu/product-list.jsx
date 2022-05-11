import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../cart.provider';

const Product = styled(ListGroup.Item)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ProductList({ products, category }) {
  const cart = useContext(CartContext);

  const categoryProducts = products.filter(p => p.categoryId === category);
  return (
    <ListGroup>
      {categoryProducts.map(product => (
        <Product key={product.id}>
          {product.name}
          <Button variant="primary" onClick={() => cart.add({ id: product.id, name: product.name, price: product.price })}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Product>
      ))}
    </ListGroup>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    categoryId: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  category: PropTypes.number.isRequired,
};

export default ProductList;
