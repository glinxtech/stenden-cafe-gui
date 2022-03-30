import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20% auto;
  text-align: center;
`;

function NotFoundPage() {
  return (
    <Wrapper>
      <h1>404 &bull; Not Found&hellip;</h1>
    </Wrapper>
  );
}

export default NotFoundPage;
