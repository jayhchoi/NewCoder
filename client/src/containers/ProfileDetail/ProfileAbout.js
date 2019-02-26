import React from 'react';

const ProfileAbout = ({ profile }) => {
  const skills = profile.skills.map((skill, index) => {
    return (
      <div key={index} className="mr-3 p-2 badge badge-primary">
        <i className="fas fa-code" /> {skill}
      </div>
    );
  });

  const interests = profile.interests.map((interest, index) => {
    return (
      <div key={index} className="mr-3 p-2 badge badge-success">
        <i className="fas fa-thumbtack" /> {interest}
      </div>
    );
  });

  return (
    <div className="row mt-3">
      <div className="col-md-12">
        <div className="card card-body bg-light">
          <h3 className="text-center text-info">프로필</h3>
          <p className="p-3 text-center">
            {profile.bio ? profile.bio : '자기소개 내용을 작성해 주세요.'}
          </p>
          <hr />
          <div>
            <h3 className="text-center text-info">기술스택</h3>
            <div className="row">
              <div className="d-flex flex-wrap mx-auto py-2">{skills}</div>
            </div>
          </div>
          <hr />
          <div>
            <h3 className="text-center text-info">관심분야</h3>
            <div className="row">
              <div className="d-flex flex-wrap mx-auto py-2">{interests}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAbout;
