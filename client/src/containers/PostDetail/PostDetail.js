import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getPost, deleteComment } from '../../actions/post.action';
import { Spinner } from '../../components';

import Comment from './Comment';
import CommentForm from './CommentForm';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  renderPost = () => {
    const { post } = this.props;

    return (
      <div className="card mb-3 shadow bg-light">
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
      </div>
    );
  };

  renderComments = () => {
    const { comments, _id } = this.props.post;
    const { auth, deleteComment } = this.props;

    if (comments.length > 0) {
      return (
        <div className="comments">
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={_id}
              auth={auth}
              deleteCommentAction={deleteComment}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { post, isFetching } = this.props;

    return (
      <div className="post page">
        <div className="container">
          <div className="row">
            <div className="col-md-8 mx-auto">
              {isFetching || _.isEmpty(post) ? (
                <Spinner />
              ) : (
                <Fragment>
                  <h1 className="display-4 mb-3">
                    <i className="fas fa-comments" /> 게시판 > 댓글
                  </h1>
                  <Link
                    to={
                      this.props.location.state
                        ? this.props.location.state.from
                        : '/feed'
                    }
                    className="btn btn-light mb-3"
                  >
                    뒤로
                  </Link>
                  {this.renderPost()}
                  <CommentForm postId={post._id} />
                  {this.renderComments()}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post.posts[ownProps.match.params.id],
    isFetching: state.post.isFetching,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getPost,
    deleteComment
  }
)(PostDetail);
