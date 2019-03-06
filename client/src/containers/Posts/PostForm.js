import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { CustomField } from '../../components';
import { createPost, selectTag } from '../../actions/post.action';
import postTags from './tags';

class PostForm extends Component {
  state = {
    selectedTag: null
  };

  onSubmit = values => {
    // const { user } = this.props.auth;

    const newPost = {
      text: values.text,
      tag: this.state.selectedTag
    };

    this.props.createPost(newPost);
    this.props.selectTag(this.state.selectedTag);
    this.setState({ selectedTag: null });
  };

  onTagClick(tag) {
    this.setState({ selectedTag: tag });
  }

  render() {
    const { errors, handleSubmit } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white p-2">
            <i className="fas fa-pen-alt" /> 게시글 올리기
          </div>
          <div className="card-body p-3">
            <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
              <CustomField
                type="text"
                component="textarea"
                name="text"
                placeholder="아래 태그 중 하나를 선택하고 관련된 글을 작성하세요"
                errors={errors}
              />
              <div className="d-sm-flex">
                <div className="mb-2">
                  {postTags.map((tag, index) => (
                    <span
                      onClick={() => this.onTagClick(tag)}
                      style={{ cursor: 'pointer' }}
                      key={index}
                      className={
                        this.state.selectedTag === tag
                          ? 'badge mr-2 badge-primary'
                          : 'badge mr-2'
                      }
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="btn btn-dark btn-block ml-auto"
                  >
                    <i className="fas fa-check" /> 저장
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
};

PostForm = reduxForm({
  form: 'postForm'
})(PostForm);

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

PostForm = connect(
  mapStateToProps,
  {
    createPost,
    selectTag
  }
)(PostForm);

export default PostForm;
