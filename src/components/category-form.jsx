import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import FormLabel from './form-label';

function CategoryForm({
  initialName,
  onSubmit,
}) {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <Form.Group as={Col} xs={12} controlId="category-name">
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

CategoryForm.propTypes = {
  initialName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

CategoryForm.defaultProps = {
  initialName: '',
};

export default CategoryForm;
