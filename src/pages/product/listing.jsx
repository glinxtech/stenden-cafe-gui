import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import apiClient from '../../api-client';
import Loading from '../../components/loading';
import DeleteProductButton from '../../components/delete-product-button';

const ControlsCell = styled.td`
  text-align: right;

  > a {
    margin-right: .8rem;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem
`;

function ProductListingPage() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    apiClient.get('/product').then(setProducts);
  }, []);

  return products === null ? (
    <Loading />
  ) : (
    <Container>
      <Title>
        <h1 className="h3">Products</h1>
        <Button as={Link} variant="info" to="/product/create">
          <FaPlus />
        </Button>
      </Title>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th aria-label="controls" />
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <th>{product.name}</th>
              <ControlsCell>
                <Button as={Link} size="sm" variant="info" to={`/product/${product.id}`}>
                  <FaPencilAlt />
                </Button>
                <DeleteProductButton
                  productId={product.id}
                  onSuccess={() => setProducts(prev => prev.filter(a => a.id !== product.id))}
                />
              </ControlsCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ProductListingPage;
