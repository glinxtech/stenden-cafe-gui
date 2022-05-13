import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import apiClient from '../api-client';
import FormLabel from './form-label';

function ProductForm({
  initialName,
  initialPrice,
  initialCategory,
  onSubmit,
}) {
  const [categories, setCategories] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiClient.get('/category').then(setCategories);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!event.target.checkValidity()) setIsValidated(true);
    else {
      setIsSubmitting(true);
      const fd = new FormData(event.target);
      await onSubmit({
        Name: fd.get('name'),
        Price: fd.get('price'),
        CategoryId: fd.get('category'),
      })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }

  function onReset() {
    setIsValidated(false);
    setIsSubmitting(false);
  }

  return (
    <Form noValidate validated={isValidated} onSubmit={handleSubmit} onReset={onReset}>
      <Row>
        <Form.Group as={Col} xs={12} controlId="product-name">
          <FormLabel>Name</FormLabel>
          <Form.Control
            required
            name="name"
            type="text"
            disabled={isSubmitting}
            defaultValue={initialName}
          />
          <Form.Control.Feedback type="invalid">
            Required
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={12} md={6} controlId="product-price">
          <FormLabel>Price</FormLabel>
          <InputGroup>
            <InputGroup.Text>&euro;</InputGroup.Text>
            <Form.Control
              required
              name="price"
              type="text"
              pattern="^\d*(\.\d{1,2})?$"
              disabled={isSubmitting}
              defaultValue={initialPrice}
            />
          </InputGroup>
          <Form.Control.Feedback type="invalid">
            Must be a valid price, eg: 13.89
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} xs={12} md={6} controlId="product-category">
          <FormLabel>Category</FormLabel>
          <Form.Select
            required
            name="category"
            disabled={isSubmitting}
            defaultValue={initialCategory}
          >
            <option>Select&hellip;</option>
            {(categories || []).map(category => (
              <option value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>

      <Row>
        <Col xs={12}>
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

ProductForm.propTypes = {
  initialName: PropTypes.string,
  initialPrice: PropTypes.number,
  initialCategory: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  initialName: '',
  initialPrice: null,
  initialCategory: null,
};

export default ProductForm;
