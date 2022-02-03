import React from 'react';

const Error = ({ error }) => {
  return (
    <>
      <h6 style={{ color: 'red' }}>{error}</h6>
    </>
  );
};

export default Error;
