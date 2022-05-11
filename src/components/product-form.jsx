import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  InputGroup,
  Form,
  Row,
  Col,
} from 'react-bootstrap';
import apiClient from '../api-client';
import FormLabel from './form-label';

function ProductForm({
  initialName,
  initialPrice,
  initialCategory,
  initialLocation,
  onSubmit,
}) {
  const [categories, setCategories] = useState(null);
  const [locations, setLocations] = useState(null);
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    apiClient.get('/categories').then(setCategories);
    apiClient.get('/locations').then(setLocations);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const values = {
      name: fd.get('name'),
      price: fd.get('price'),
      category: fd.get('category'),
      location: fd.get('location'),
    };

    if (!event.target.checkValidity()) setIsValidated(true);
    else {
      setIsSubmitting(true);
      await onSubmit(values).finally(() => {
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
        <Form.Group as={Col} xs={12} md={6} controlId="product-name">
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

        <Form.Group as={Col} xs={12} md={6} controlId="product-location">
          <FormLabel>Location</FormLabel>
          <Form.Select
            required
            name="location"
            disabled={isSubmitting}
            defaultValue={initialLocation}
          >
            <option>Select&hellip;</option>
            {(locations || []).map(option => (
              <option value={option.id}>
                {option.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </Form>
  );
}

ProductForm.propTypes = {
  initialName: PropTypes.string,
  initialPrice: PropTypes.number,
  initialCategory: PropTypes.number,
  initialLocation: PropTypes.number,
  onSubmit: PropTypes.func.isRequired,
};

ProductForm.defaultProps = {
  initialName: '',
  initialPrice: null,
  initialCategory: null,
  initialLocation: null,
};

export default ProductForm;
