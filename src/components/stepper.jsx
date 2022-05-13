import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-bottom: 0;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

function Stepper({
  value,
  min,
  max,
  setValue,
}) {
  return (
    <Wrapper>
      <Button onClick={() => setValue(value - 1)} disabled={value === min}>
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <p>{value}</p>
      <Button onClick={() => setValue(value + 1)} disabled={value === max}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Wrapper>
  );
}

Stepper.propTypes = {
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
};

Stepper.defaultProps = {
  min: 0,
};

export default Stepper;
