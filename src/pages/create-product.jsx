import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import apiClient from '../api-client';
import ProductForm from '../components/product-form';

function CreateProductPage() {
  async function onSubmit(values) {
    return apiClient.post('/product', values);
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="h3">Create Product</h1>
        </Col>
      </Row>
      <ProductForm onSubmit={onSubmit} />
    </Container>
  );
}

export default CreateProductPage;
