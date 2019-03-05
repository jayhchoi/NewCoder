import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { CustomField } from '../../components';
import { createPost } from '../../actions/post.action';
import postTags from './tags';

class PostForm extends Component {
  onSubmit = values => {
    // const { user } = this.props.auth;

    const newPost = {
      text: values.text
    };

    this.props.createPost(newPost);
  };

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
              <div className="form-group">
                <CustomField
                  type="text"
                  component="textarea"
                  name="text"
                  placeholder="유용한 정보, 궁금한 질문, 스터디 모집 등을 자유롭게 게시해 주세요"
                  errors={errors}
                />
              </div>
              <div className="d-sm-flex">
                <div className="mb-2">
                  {postTags.map((tag, index) => (
                    <span key={index} className="badge badge-primary mr-2">
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
    createPost
  }
)(PostForm);

export default PostForm;
