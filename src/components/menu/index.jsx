import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Row,
  Col,
  Nav,
  Table,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductList from './product-list';
import { CartContext } from '../cart.provider';

function Menu({ products, categories }) {
  const cart = useContext(CartContext);

  return (
    <Tab.Container defaultActiveKey={1}>
      <Row>
        <Col sm={3}>
          <Nav className="flex-column" variant="pills">
            {categories.map(cat => (
              <Nav.Item key={cat.id}>
                <Nav.Link eventKey={cat.id}>{cat.name}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col className="flex-column">
          <Tab.Content>
            {categories.map(cat => (
              <Tab.Pane key={cat.id} eventKey={cat.id}>
                <ProductList products={products} category={cat.id} />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
        <Col sm={5}>
          <Table striped>
            <thead>
              <tr>
                <th>Product</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
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
                    {item.amount}
                    <Button onClick={() => cart.setAmount(item.id, (item.amount + 1))}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button>Order</Button>
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
