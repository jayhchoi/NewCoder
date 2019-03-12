import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Education = ({ education, onDeleteClick }) => {
  const renderEducation = education.map((edu, index) => {
    return (
      <div key={index} className="col-sm-6 col-md-4 my-2">
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
                ' 현재'
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
      <h4 className="mb-2 text-info">교육사항</h4>
      <div className="row my-3">
        {education.length === 0 ? (
          <small className="ml-3">
            교육 관련 정보를 추가해 프로필을 완성하세요
          </small>
        ) : (
          renderEducation
        )}
      </div>
    </div>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default Education;
