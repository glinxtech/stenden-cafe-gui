import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import apiClient from '../api-client';
import Menu from '../components/menu';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    apiClient.get('/product').then(resProducts => {
      setProducts(resProducts.map(({ category, ...product }) => product));
      setCategories([
        ...new Map(resProducts.map(prod => [prod.category.id, prod.category])).values(),
      ]);
    });
  }, []);

  return (
    <Container>
      <Menu products={products} categories={categories} />
    </Container>
  );
}

export default HomePage;
