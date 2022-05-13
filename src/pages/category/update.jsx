import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import apiClient from '../../api-client';
import CategoryForm from '../../components/category-form';
import Loading from '../../components/loading';

function UpdateCategoryPage() {
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState(null);

  useEffect(() => {
    apiClient.get(`/category/${categoryId}`).then(category => {
      setCategoryName(category.name);
    });
  }, []);

  async function onSubmit(values) {
    return apiClient.put(`/category/${categoryId}`, values).then(category => {
      setCategoryName(category.name);
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="h3">
            {categoryName ? `Update ${categoryName}` : 'Loading...'}
          </h1>
        </Col>
      </Row>

      {categoryName ? (
        <CategoryForm
          initialName={categoryName}
          onSubmit={onSubmit}
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default UpdateCategoryPage;
