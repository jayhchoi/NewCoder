import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = ({ state, defaultTo }) => {
  return (
    <Link to={state ? state.from : defaultTo} className="btn btn-light mb-2">
      뒤로
    </Link>
  );
};

export default BackButton;
