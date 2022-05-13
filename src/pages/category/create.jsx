import React from 'react';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import apiClient from '../../api-client';
import CategoryForm from '../../components/category-form';

function CreateCategoryPage() {
  async function onSubmit(values) {
    return apiClient.post('/category', values);
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="h3">Create Category</h1>
        </Col>
        <CategoryForm
          onSubmit={onSubmit}
        />
      </Row>
    </Container>
  );
}

export default CreateCategoryPage;
