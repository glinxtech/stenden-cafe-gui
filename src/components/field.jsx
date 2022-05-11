import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { Field as FormikField } from 'formik';

function Field({
  children,
  name,
  label,
  component,
  disabled,
  error,
  ...props

}) {
  return (
    <Form.Group>
      {label && (
        <Form.Label>{label}</Form.Label>
      )}

      <FormikField
        name={name}
        component={component}
        disabled={disabled}
        {...props}
      >
        {children}
      </FormikField>

      {error && (
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
}

Field.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  component: PropTypes.elementType,
  disabled: PropTypes.bool,
  error: PropTypes.string,
};

Field.defaultProps = {
  children: null,
  label: null,
  component: Form.Control,
  disabled: false,
  error: null,
};

export default Field;
