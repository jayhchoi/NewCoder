import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BackButton = ({ state, defaultTo }) => {
  return (
    <Link to={state ? state.from : defaultTo} className="btn btn-light mb-2">
      뒤로
    </Link>
  );
};

BackButton.propTypes = {
  state: PropTypes.object,
  defaultTo: PropTypes.string.isRequired
};

export default BackButton;
