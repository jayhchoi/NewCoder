import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Moment from 'react-moment';

import { getPost, deleteComment } from '../../actions/post.action';
import { getCurrentProfile } from '../../actions/profiles.action';
import { setErrors } from '../../actions/errors.action';
import { Spinner, BackButton } from '../../components';

import Comment from './Comment';
import CommentForm from './CommentForm';
import { Page } from '../../styledComponents';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPost(this.props.match.params.id);
    this.props.setErrors();
  }

  renderPost = () => {
    const { post } = this.props;

    return (
      <div className="card mb-3 shadow bg-light">
        <div className="card-body p-3">
          <Link
            to={{
              pathname: `/profile/${post.user.handle}`,
              state: { from: this.props.location }
            }}
          >
            <img
              className="rounded-circle float-left"
              style={{ height: '64px', width: '64px' }}
              src={post.user.avatar}
              alt=""
            />
          </Link>
          <div className="author pl-3" style={{ marginLeft: '64px' }}>
            <span className="mr-2 text-info">{post.user.name}</span>
            <span className="text-muted float-right">
              <Moment format="YYYY/MM/DD">{post.created}</Moment>
            </span>
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
              from={this.props.location}
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
    if (this.props.profile.isFetching) return <Spinner />;

    return (
      <Page>
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
                  <BackButton
                    state={this.props.location.state}
                    defaultTo="/feed"
                  />
                  {this.renderPost()}
                  <CommentForm postId={post._id} />
                  {this.renderComments()}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Page>
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
    auth: state.auth,
    profile: state.profile
  };
};

export default connect(
  mapStateToProps,
  {
    getPost,
    deleteComment,
    getCurrentProfile,
    setErrors
  }
)(PostDetail);
