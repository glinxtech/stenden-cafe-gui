import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import { FaPencilAlt } from 'react-icons/fa';
import apiClient from '../../api-client';
import Loading from '../../components/loading';
import DeleteCategoryButton from '../../components/delete-category-button';

const ControlsCell = styled.td`
  text-align: right;

  > a {
    margin-right: .8rem;
  }
`;

function CategoryListingPage() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    apiClient.get('/category').then(setCategories);
  }, []);

  return categories === null ? (
    <Loading />
  ) : (
    <Container>
      <h1 className="h3">Categories</h1>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th aria-label="controls" />
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <th>{category.name}</th>
              <ControlsCell>
                <Button as={Link} size="sm" variant="info" to={`/category/${category.id}`}>
                  <FaPencilAlt />
                </Button>
                <DeleteCategoryButton
                  categoryId={category.id}
                  onSuccess={() => setCategories(prev => prev.filter(a => a.id !== category.id))}
                />
              </ControlsCell>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default CategoryListingPage;
