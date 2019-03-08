import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import PostForm from './PostForm';
import _ from 'lodash';

import {
  getPosts,
  deletePost,
  addLike,
  removeLike,
  selectTag
} from '../../actions/post.action';
import { setErrors } from '../../actions/errors.action';
import { Spinner } from '../../components';
import { Page } from '../../wrappers';

import Post from './Post';
import postTags from './tags';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
    this.props.setErrors();
  }

  onTagClick(e, tag) {
    this.props.selectTag(tag);
  }

  renderPosts = () => {
    const {
      posts,
      isFetching,
      auth,
      deletePost,
      addLike,
      removeLike
    } = this.props;

    if (isFetching) {
      return <Spinner />;
    } else {
      if (_.isEmpty(posts)) {
        return (
          <h5 className="text-warning text-center mt-5">
            게시물을 찾을 수 없습니다.
          </h5>
        );
      } else {
        if (this.props.tag === null)
          return posts.map(post => (
            <Post
              key={post._id}
              post={post}
              auth={auth}
              deletePostAction={deletePost}
              addLikeAction={addLike}
              removeLikeAction={removeLike}
              from={this.props.location}
            />
          ));

        return posts.map(post => {
          if (post.tag === this.props.tag) {
            return (
              <Post
                key={post._id}
                post={post}
                auth={auth}
                deletePostAction={deletePost}
                addLikeAction={addLike}
                removeLikeAction={removeLike}
                from={this.props.location}
              />
            );
          }
        });
      }
    }
  };

  render() {
    return (
      <Page>
        <Helmet>
          <title>NewCoder | 게시판</title>
        </Helmet>
        <div className="container">
          <div className="row">
            {/* Tag select menu */}
            <div className="col-md-3 tag-select-menu d-none d-md-block">
              <ul className="list-group">
                <li
                  onClick={() => this.props.selectTag(null)}
                  className="list-group-item"
                >
                  <span
                    className={
                      this.props.tag === null
                        ? `tag-menu tag-selected`
                        : `tag-menu`
                    }
                  >
                    #All
                  </span>
                </li>
                {postTags.map((tag, index) => (
                  <li key={index} className="list-group-item">
                    <span
                      className={
                        this.props.tag === tag
                          ? `tag-menu tag-selected`
                          : 'tag-menu'
                      }
                      onClick={e => this.onTagClick(e, tag)}
                    >
                      #{tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-9">
              <h1 className="display-4 mb-3">
                <i className="fas fa-comments" /> 게시판
              </h1>
              <PostForm />
              {/* Tag select menu for mobile */}
              <div className="d-md-none text-center mb-2">
                <button
                  onClick={() => this.props.selectTag(null)}
                  className={`btn btn-outline-secondary p-1 mr-2 my-1 ${
                    this.props.tag === null ? 'active' : ''
                  }`}
                >
                  <span
                    className={
                      this.props.tag === null ? `tag-menu` : `tag-menu`
                    }
                  >
                    #All
                  </span>
                </button>
                {postTags.map((tag, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-secondary p-1 mr-2 my-1 ${
                      this.props.tag === tag ? 'active' : ''
                    }`}
                  >
                    <span
                      className={
                        this.props.tag === tag ? `tag-menu` : 'tag-menu'
                      }
                      onClick={e => this.onTagClick(e, tag)}
                    >
                      #{tag}
                    </span>
                  </button>
                ))}
              </div>
              {this.renderPosts()}
            </div>
          </div>
        </div>
      </Page>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    posts: _.orderBy(state.post.posts, ['_id'], ['desc']), // Convert to array of objects while sorting it desc
    isFetching: state.post.isFetching,
    auth: state.auth,
    tag: state.post.selectedTag
  };
};

export default connect(
  mapStateToProps,
  {
    getPosts,
    deletePost,
    addLike,
    removeLike,
    setErrors,
    selectTag
  }
)(Posts);
