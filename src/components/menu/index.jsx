import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Row,
  Col,
  Button,
  ListGroup,
} from 'react-bootstrap';
import Cart from '../cart';
import ProductList from './product-list';

function Menu({ products, categories }) {
  return (
    <Tab.Container defaultActiveKey="#1">
      <Row>
        <Col sm={3}>
          <ListGroup>
            {categories.map(cat => (
              <ListGroup.Item key={cat.id} href={`#${cat.id}`}>
                {cat.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col className="flex-column">
          <Tab.Content>
            {categories.map(cat => (
              <Tab.Pane key={cat.id} eventKey={`#${cat.id}`}>
                <ProductList products={products} category={cat.id} />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
        <Col sm={5}>
          <Cart simple />
          <Button href="/cart">Order</Button>
        </Col>
      </Row>
    </Tab.Container>
  );
}

Menu.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    categoryId: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default Menu;
