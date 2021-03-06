import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
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
  removeLikeAction,
  from
}) => {
  return (
    <div className="post">
      <div className="card mb-3">
        <div className="card-body p-3">
          <Link
            to={{
              pathname: `/profile/${post.user.handle}`,
              state: { from }
            }}
          >
            <img
              className="rounded-circle float-left"
              style={{ height: '64px', width: '64px' }}
              src={post.user.avatar}
              alt=""
            />
          </Link>
          <div
            className="author pl-3 d-flex justify-content-between align-items-top"
            style={{ marginLeft: '64px' }}
          >
            <div>
              <span className="text-info">{post.user.name}</span>
            </div>
            <div className="text-right">
              <div className="text-muted">
                <Moment format="YYYY/MM/DD">{post.created}</Moment>
              </div>
              <div className="badge badge-primary">#{post.tag}</div>
            </div>
          </div>
          <div
            className="post-content py-1 px-3"
            style={{ marginLeft: '64px' }}
          >
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
                className="btn btn-light"
              >
                <i className="text-secondary fas fa-thumbs-down" />
              </button>
            </div>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              <i className="fas fa-reply" /> 댓글{' '}
              <span className="badge badge-pill badge-light">
                {post.comments.length}
              </span>
            </Link>
            {post.user._id === auth.user._id ? (
              <button
                onClick={() => deletePostAction(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-trash" />
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
