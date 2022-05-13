import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { CurrentUserContext } from '../current-user.provider';
import FormLabel from '../form-label';

const FieldsRow = styled(Row)`
  > div:not(:last-of-type) {
    margin-bottom: 1rem;
  }
`;

function LoginModal() {
  const navigate = useNavigate();
  const { login } = useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const values = {
      username: fd.get('username'),
      password: fd.get('password'),
    };
    console.log(values);

    if (!event.target.checkValidity()) setIsValidated(true);
    else {
      setIsSubmitting(true);
      await login(values)
        .then(() => {
          navigate('/', { replace: true });
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }

  function onReset() {
    setIsOpen(false);
    setIsSubmitting(false);
    setIsValidated(false);
  }

  return (
    <>
      <Button variant="link" onClick={() => setIsOpen(true)}>
        Login
      </Button>

      <Modal
        centered
        animation
        backdrop
        show={isOpen}
        size="lg"
        onHide={onReset}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>

        <Form noValidate validated={isValidated} onSubmit={onSubmit} onReset={onReset}>
          <Modal.Body>
            <FieldsRow>
              <Form.Group as={Col} xs={12} controlId="login-username">
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

              <Form.Group as={Col} xs={12} controlId="login-password">
                <FormLabel>Password</FormLabel>
                <Form.Control
                  required
                  name="password"
                  type="password"
                  disabled={isSubmitting}
                />
                <Form.Control.Feedback type="invalid">
                  Required
                </Form.Control.Feedback>
              </Form.Group>
            </FieldsRow>
          </Modal.Body>

          <Modal.Footer>
            <Button type="reset" variant="warning" disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="info" disabled={isSubmitting}>
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default LoginModal;
