import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Experience = ({ experience, onDeleteClick }) => {
  const renderExperience = experience.map(exp => {
    return (
      <div key={exp._id} className="col-sm-6 col-md-4 my-2">
        <div className="card">
          <div className="card-body">
            <button
              onClick={() => {
                if (window.confirm('Are you sure?')) onDeleteClick(exp._id);
              }}
              className="btn float-right m-0 p-0"
            >
              <i className="fas fa-times" />
            </button>
            <h5 className="card-title">{exp.company}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{exp.title}</h6>
            <p className="card-text">
              <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
              {exp.to === undefined ? (
                ' Now'
              ) : (
                <Moment format="YYYY/MM/DD">{exp.to}</Moment>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h4 className="mb-2 text-info">Experience Credentials</h4>
      <div className="row my-3">{renderExperience}</div>
    </div>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired
};

export default Experience;
