import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import history from '../../utils/history';

const Profile = ({ profile }) => {
  const { pathname } = history.location;

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <ProfileCard>
        <CardImageWrapper>
          <CardImageTop
            src={`https://source.unsplash.com/random/?coding,computer,python,java,javascript,programming?${
              profile._id
            }?300x100`}
            alt="..."
          />
        </CardImageWrapper>
        <CardAvatar src={profile.user.avatar} alt="..." />
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
            {profile.interests.slice(0, 4).map((interest, index) => {
              return (
                <span
                  key={index}
                  className="badge badge-success text-white mr-1"
                >
                  {interest}
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
      </ProfileCard>
    </div>
  );
};

const ProfileCard = styled.div.attrs({
  className: 'card'
})`
  border: none;
`;

const CardImageWrapper = styled.div`
  height: 100px;
  overflow: hidden;
`;

const CardImageTop = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const CardAvatar = styled.img`
  margin-top: -50px !important;
  height: 100px;
  width: 100px;
  margin-left: 5%;
  border-radius: 50%;
`;

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Profile;
