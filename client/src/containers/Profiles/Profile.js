import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import history from '../../utils/history';

const Profile = ({ profile }) => {
  const { pathname } = history.location;

  return (
    <div className="col-md-4 col-sm-6 profile mb-3">
      <div className="card">
        <div className="card-img-wrapper">
          <img
            src={`https://source.unsplash.com/random/?coding,computer,python,java,javascript,programming?${
              profile._id
            }?300x100`}
            className="card-img-top"
            alt="..."
          />
        </div>
        <img
          src={profile.user.avatar}
          className="rounded-circle round-avatar"
          alt="..."
        />
        <div className="card-body">
          <p className="card-text mb-2">
            <span className="card-title h5 mb-2">{profile.user.name}</span>
            {!profile.location ? null : (
              <span className="float-right">
                <i className="fas fa-map-marker-alt" /> {profile.location}
              </span>
            )}
          </p>
          <p className="card-text">
            <em>{profile.status}</em>
            {profile.company ? (
              <span className="float-right">
                <i className="fas fa-building" /> {profile.company}
              </span>
            ) : null}
          </p>
          <hr />
          <div>
            <h6>기술스택</h6>
            {profile.skills.slice(0, 4).map((skill, index) => {
              return (
                <span
                  key={index}
                  className="badge badge-primary text-white mr-1"
                >
                  {skill}
                </span>
              );
            })}
          </div>
          <hr />
          <div>
            <h6>관심분야</h6>
            {profile.skills.slice(0, 4).map((skill, index) => {
              return (
                <span
                  key={index}
                  className="badge badge-secondary text-white mr-1"
                >
                  {skill}
                </span>
              );
            })}
          </div>
          <Link
            to={{
              pathname: `/profile/${profile.user.handle}`,
              state: { from: { pathname } }
            }}
            className="btn btn-info btn-block mt-2"
          >
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;
