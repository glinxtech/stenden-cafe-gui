import React, { useEffect, useState } from 'react';
import {
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import Field from '../components/field';
import apiClient from '../components/api-client'; // Should just be in /src

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required(),
  category: Yup.number().integer().unsigned().required(),
  price: Yup.number().unsigned().required(),
}).required();

function CreateProductPage() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    apiClient.get('/categories').then(res => setCategories(res));
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="h3">Create Product</h1>
        </Col>

      </Row>

      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          category: null,
          price: '',
        }}
      >
        {({
          submitting,
          errors,
          touched,
          handleSubmit,
        }) => (
          <FormikForm onSubmit={handleSubmit}>
            <Row>
              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Field
                    name="name"
                    type="text"
                    component={Form.Control}
                    disabled={submitting}
                  />
                  {touched.name && errors.name && (
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Field
                    name="category"
                    disabled={submitting || categories === null}
                    component={Form.Select}
                  >
                    <option>Category&hellip;</option>
                  </Field>
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Field
                    name="price"
                    type="text"
                    disabled={submitting}
                    component={Form.Control}
                  />
                  {touched.price && errors.price && (
                    <Form.Control.Feedback type="invalid">
                      {errors.price}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
}

export default CreateProductPage;
