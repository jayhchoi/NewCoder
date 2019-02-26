import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const Comment = ({
  comment,
  auth,
  postId,
  deleteCommentAction,
  dispatch,
  from
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body p-3">
        <Link
          to={{
            pathname: `/profile/${comment.user.handle}`,
            state: { from }
          }}
        >
          <img
            className="rounded-circle float-left"
            style={{ height: '64px', width: '64px' }}
            src={comment.user.avatar}
            alt=""
          />
        </Link>
        <div className="author pl-3" style={{ marginLeft: '64px' }}>
          <span className="mr-2">{comment.user.name}</span>
          <span className="text-muted">@{comment.user.handle}</span>
          <span className="text-muted float-right">
            <Moment format="YYYY/MM/DD">{comment.created}</Moment>
          </span>
        </div>
        <div className="post-content p-3" style={{ marginLeft: '64px' }}>
          {comment.text}
        </div>
      </div>
      {comment.user._id === auth.user._id ? (
        <div className="card-footer p-2 text-right">
          <button
            onClick={() => deleteCommentAction(postId, comment._id)}
            type="button"
            className="btn btn-danger mr-1"
          >
            <i className="fas fa-times" />
          </button>
        </div>
      ) : null}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteCommentAction: PropTypes.func.isRequired
};

export default Comment;
