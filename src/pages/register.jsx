import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Button,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';
import apiClient from '../api-client';
import FormLabel from '../components/form-label';

const StyledForm = styled(Form)`
  > .row {
    &:first-of-type > div {
      margin-bottom: 1rem;
    }
    &:last-of-type > div {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3.5rem;
    border-radius: 50%;
    background-color: #eaeaea;
  }

  .fa {
    width: 60%;
    margin-bottom: 1.5em;
    fill: #7ee778;
  }
`;

function RegisterForm() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    let timeout;
    if (isRegistered) {
      timeout = setTimeout(() => {
        navigate('/', { replace: true });
      }, 6000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isRegistered]);

  async function onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const values = {
      username: fd.get('username').trim(),
      location: fd.get('location').trim() || null,
      password: fd.get('password'),
      confirmPassword: fd.get('confirmPassword'),
    };

    if (!event.target.checkValidity() || values.password !== values.confirmPassword) {
      setValidated(true);
    } else {
      setIsSubmitting(true);
      await apiClient.post('/user', {
        username: values.username,
        location: values.location,
        password: values.password,
      })
        .then(() => {
          setIsRegistered(true);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }

  return !isRegistered ? (
    <Container>
      <Row>
        <Col xs={12}>
          <h1 className="h3">Register</h1>
        </Col>
      </Row>

      <StyledForm noValidate validated={validated} onSubmit={onSubmit}>
        <Row>
          <Form.Group as={Col} xs={12} sm={6} controlId="username">
            <FormLabel>Username</FormLabel>
            <Form.Control
              required
              name="username"
              type="text"
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Required
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="location">
            <FormLabel>Location</FormLabel>
            <Form.Control name="location" type="text" disabled={isSubmitting} />
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="password">
            <FormLabel>Password</FormLabel>
            <Form.Control
              required
              name="password"
              type="password"
              pattern=".{6,}"
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Must be at least 6 characters
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs={12} sm={6} controlId="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Form.Control
              required
              name="confirmPassword"
              type="password"
              pattern=".{6,}"
              disabled={isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              Passwords do not match
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row>
          <Col xs={12}>
            <Button type="submit" variant="info" disabled={isSubmitting}>
              Register
            </Button>
          </Col>
        </Row>
      </StyledForm>
    </Container>
  ) : (
    <SuccessMessage>
      <div>
        <FaCheck />
        <h1 className="h1">Registration Complete!</h1>
      </div>
    </SuccessMessage>
  );
}

export default RegisterForm;
