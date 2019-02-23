import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Education = ({ education, onDeleteClick }) => {
  const renderEducation = education.map(edu => {
    return (
      <div key={edu._id} className="col-sm-6 col-md-4 my-2">
        <div className="card">
          <div className="card-body">
            <button
              onClick={() => {
                if (window.confirm('Are you sure?')) onDeleteClick(edu._id);
              }}
              className="btn float-right m-0 p-0"
            >
              <i className="fas fa-times" />
            </button>
            <h5 className="card-title">{edu.school}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{edu.degree}</h6>
            <p className="card-text">
              <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
              {edu.to === undefined ? (
                ' Now'
              ) : (
                <Moment format="YYYY/MM/DD">{edu.to}</Moment>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <h4 className="mb-2 text-info">Education Credentials</h4>
      <div className="row my-3">{renderEducation}</div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired
};

export default Education;
