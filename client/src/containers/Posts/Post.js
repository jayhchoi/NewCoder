import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const userLikedThis = (likes, user) => {
  if (likes.filter(like => like.user === user._id).length > 0) {
    return true;
  } else {
    return false;
  }
};

const Post = ({
  post,
  auth,
  deletePostAction,
  addLikeAction,
  removeLikeAction
}) => {
  return (
    <div className="post">
      <div className="card mb-3">
        <div className="card-body p-3">
          <img
            className="rounded-circle float-left"
            style={{ height: '64px', width: '64px' }}
            src={post.avatar}
            alt=""
          />
          <div className="author pl-3" style={{ marginLeft: '64px' }}>
            <span className="mr-2">{post.name}</span>
            <span className="text-muted">@handle</span>
            <span className="text-muted float-right">Jan 3</span>
          </div>
          <div className="post-content p-3" style={{ marginLeft: '64px' }}>
            {post.text}
          </div>
        </div>
        <div className="card-footer p-2 text-right">
          <div className="buttons">
            <div className="likes-dislikes float-left">
              <button
                onClick={() => addLikeAction(post._id)}
                type="button"
                className="btn btn-light"
              >
                <i
                  className={`${
                    userLikedThis(post.likes, auth.user) ? 'text-info' : null
                  } fas fa-thumbs-up`}
                />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <button
                onClick={() => removeLikeAction(post._id)}
                type="button"
                className="btn btn-light mr-3"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
            </div>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user._id ? (
              <button
                onClick={() => deletePostAction(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePostAction: PropTypes.func.isRequired,
  addLikeAction: PropTypes.func.isRequired,
  removeLikeAction: PropTypes.func.isRequired
};

export default Post;
