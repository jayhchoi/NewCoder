import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment, auth, postId, deleteCommentAction, dispatch }) => {
  return (
    <div className="card mb-3">
      <div className="card-body p-3">
        <img
          className="rounded-circle float-left"
          style={{ height: '64px', width: '64px' }}
          src={comment.avatar}
          alt=""
        />
        <div className="author pl-3" style={{ marginLeft: '64px' }}>
          <span className="mr-2">{comment.name}</span>
          <span className="text-muted">@handle</span>
          <span className="text-muted float-right">9999/99/99</span>
        </div>
        <div className="post-content p-3" style={{ marginLeft: '64px' }}>
          {comment.text}
        </div>
      </div>
      <div className="card-footer p-2 text-right">
        {comment.user === auth.user._id ? (
          <button
            onClick={() => deleteCommentAction(postId, comment._id)}
            type="button"
            className="btn btn-danger mr-1"
          >
            <i className="fas fa-times" />
          </button>
        ) : null}
      </div>
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
