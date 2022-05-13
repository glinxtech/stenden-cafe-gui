import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import apiClient from '../../api-client';
import ProductForm from '../../components/product-form';
import Loading from '../../components/loading';

function UpdateProductPage() {
  const { productId } = useParams();
  const [productName, setProductName] = useState(null);
  const [productCategory, setProductCategory] = useState(null);
  const [productPrice, setProductPrice] = useState(null);

  useEffect(() => {
    apiClient.get(`/product/${productId}`).then(product => {
      setProductName(product.name);
      setProductCategory(product.categoryId);
      setProductPrice(product.price);
    });
  }, []);

  async function onSubmit(values) {
    return apiClient.put(`/product/${productId}`, values);
  }

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="h3">
            {productName ? `Update ${productName}` : 'Loading...'}
          </h1>
        </Col>
      </Row>

      {productName ? (
        <ProductForm
          initialName={productName}
          initialCategory={productCategory}
          initialPrice={productPrice}
          onSubmit={onSubmit}
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default UpdateProductPage;
