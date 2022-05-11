import React from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const Background = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .2);
`;

const Spinner = styled(FaSpinner)`
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  animation: 1.8s linear 0 infinite spin;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  margin-top: 1em;
  margin-bottom: 0;
`;

function Loading() {
  return (
    <Background>
      <Spinner />
      <LoadingText>Loading&hellip;</LoadingText>
    </Background>
  );
}

export default Loading;
