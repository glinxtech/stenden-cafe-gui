import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Menu from '../components/menu';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/api/product')
      .then(res => res.json())
      .then(data => {
        setProducts(data.map(({ category, ...product }) => product));
        setCategories([...new Map(data.map(prod => [prod.category.id, prod.category])).values()]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Container>
      <h1>Home Page</h1>
      <Menu products={products} categories={categories} />
    </Container>
  );
}

export default HomePage;
