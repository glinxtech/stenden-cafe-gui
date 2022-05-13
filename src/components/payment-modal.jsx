import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

function PaymentModal({ total, onConfirm }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Pay
      </Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Checkout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Confirm Payment of {total}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { onConfirm(); handleClose(); }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

PaymentModal.propTypes = {
  total: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default PaymentModal;
