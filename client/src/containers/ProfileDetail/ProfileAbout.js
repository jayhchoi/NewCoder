import React from 'react';

const ProfileAbout = ({ profile }) => {
  const firstname = profile.user.name.trim().split(' ')[0];

  const skills = profile.skills.map((skill, index) => {
    return (
      <div key={index} className="p-3">
        <i className="fa fa-check" /> {skill}
      </div>
    );
  });

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="card card-body bg-light">
          <h3 className="text-center text-info">{firstname}'s Bio</h3>
          <p className="lead">
            {profile.bio ? profile.bio : 'Does not have a bio yet'}
          </p>
          <hr />
          <h3 className="text-center text-info">Skill Set</h3>
          <div className="row">
            <div className="d-flex flex-wrap justify-content-center align-items-center">
              {skills}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
