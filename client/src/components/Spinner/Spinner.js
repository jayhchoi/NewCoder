import React from 'react';

import spinner from './spinner_ball.gif';

const Spinner = () => {
  return (
    <img
      src={spinner}
      style={{
        width: '200px',
        margin: 'auto',
        display: 'block'
      }}
      alt="Loading..."
    />
  );
};

export default Spinner;
