import React from 'react';
import PropTypes from 'prop-types';
import {
  Tab,
  Row,
  Col,
  Nav,
  ListGroup,
} from 'react-bootstrap';
import styled from 'styled-components';

function TabContent(props) {
  const { products, category } = props;

  const productList = products
    .filter(product => product.categoryId === category)
    .map(product => (
      <ListGroup.Item as="li">{product.name}</ListGroup.Item>
    ));

  return (
    <ListGroup as="ul">{productList}</ListGroup>
  );
}

TabContent.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    categoryId: PropTypes.number,
    price: PropTypes.number,
  })).isRequired,
  category: PropTypes.number.isRequired,
};

const StyledNav = styled(Nav)`
  display: flex;
  flex-direction: column;
`;

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;

function Menu(props) {
  const { products, categories } = props;
  return (
    <Tab.Container>
      <Row>
        <Col sm={3}>
          <StyledNav variant="pills">
            {categories.map(cat => (
              <Nav.Item>
                <Nav.Link eventKey={cat.id}>{cat.name}</Nav.Link>
              </Nav.Item>
            ))}
          </StyledNav>
        </Col>
        <StyledCol sm={9}>
          <Tab.Content>
            {categories.map(cat => (
              <Tab.Pane eventKey={cat.id}>
                <TabContent products={products} category={cat.id} />
              </Tab.Pane>
            ))}
          </Tab.Content>
        </StyledCol>
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
