import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const ProfileCredentials = ({ experience, education, location }) => {
  const experiences = experience.map(exp => (
    <li key={exp._id} className="list-group-item mb-1">
      <h4>{exp.company}</h4>
      <p>
        <Moment format="YYYY/MM">{exp.from}</Moment> -{' '}
        {exp.to ? <Moment format="YYYY/MM">{exp.to}</Moment> : 'Now'}
      </p>
      <p>
        <strong>직책:</strong> {exp.title}
      </p>
      {exp.location ? (
        <p>
          <strong>위치:</strong> {exp.location}
        </p>
      ) : null}
      {exp.description ? (
        <p>
          <strong>설명:</strong> {exp.description}
        </p>
      ) : null}
    </li>
  ));

  const educations = education.map(edu => (
    <li key={edu._id} className="list-group-item mb-1">
      <h4>{edu.school}</h4>
      <p>
        <Moment format="YYYY/MM">{edu.from}</Moment> -{' '}
        {edu.to ? <Moment format="YYYY/MM">{edu.to}</Moment> : 'Now'}
      </p>
      <p>
        <strong>학위: </strong>
        {edu.degree}
      </p>
      <p>
        <strong>전공분야: </strong>
        {edu.fieldofstudy}
      </p>

      {edu.description ? (
        <p>
          <strong>설명:</strong> {edu.description}
        </p>
      ) : null}
    </li>
  ));

  return (
    <div className="row">
      <div className="col-md-6 mt-3">
        <h3 className="text-center text-info">경력</h3>
        <ul className="list-group">
          {experiences.length > 0 ? (
            experiences
          ) : (
            <div
              style={{ border: 'solid rgba(0,0,0,.125) 1px', height: '100%' }}
            >
              <Link
                to={{
                  pathname: '/add-experience',
                  state: { from: location }
                }}
                className="my-5 d-block"
              >
                <p className="text-center">경력사항을 추가하세요</p>
              </Link>
            </div>
          )}
        </ul>
      </div>
      <div className="col-md-6 mt-3">
        <h3 className="text-center text-info">교육</h3>
        <ul className="list-group">
          {educations.length > 0 ? (
            educations
          ) : (
            <div style={{ border: 'solid rgba(0,0,0,.125) 1px' }}>
              <Link
                to={{
                  pathname: '/add-education',
                  state: { from: location }
                }}
                className="my-5 d-block"
              >
                <p className="text-center">교육사항을 추가하세요</p>
              </Link>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileCredentials;
