import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Spinner, BackButton } from '../../components'
import { Page } from '../../styledComponents'

import { getProfileByHandle } from '../../actions/profiles.action'
import { getPosts } from '../../actions/post.action'

import ProfileHeader from './ProfileHeader'
import ProfileAbout from './ProfileAbout'
import ProfileCredentials from './ProfileCredentials'
import ProfileGithub from './ProfileGithub'
import Post from '../Posts/Post'
import ProfileTimelineItem from './ProfileTimelineItem'

class ProfileDetail extends Component {
  state = {
    showInfo: true
  }

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle)
      this.props.getPosts()
    }
  }

  renderInfo(profile) {
    return (
      <div id="profile-info">
        <ProfileAbout profile={profile} />
        <ProfileCredentials
          education={profile.education}
          experience={profile.experience}
          location={this.props.location}
          profile={this.props.auth}
          auth={this.props.profile.profile}
        />
        {profile.githubusername ? (
          <ProfileGithub username={profile.githubusername} />
        ) : null}
      </div>
    )
  }

  renderTimeline() {
    const { posts, isFetching } = this.props.post

    if (isFetching) return <Spinner />
    if (Object.keys(posts).length === 0)
      return <p className="lead">Posts does not exist</p>

    return (
      <div className="container mt-3">
        {posts.map((post, index) => (
          <ProfileTimelineItem
            key={index}
            post={post}
            from={this.props.location}
          />
        ))}
      </div>
    )
  }

  render() {
    const { profile, isFetching } = this.props.profile

    if (isFetching) return <Spinner />
    if (Object.keys(profile).length === 0)
      return <p className="lead">Profile does not exist</p>

    return (
      <Page>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <BackButton
                    state={this.props.location.state}
                    defaultTo="/profiles"
                  />
                </div>
              </div>
              <ProfileHeader profile={profile} />
              <div className="d-flex justify-content-around align-items-center">
                <MenuButton
                  onClick={() => this.setState({ showInfo: true })}
                  className="flex-fill"
                >
                  정보
                </MenuButton>
                <MenuButton
                  onClick={() => this.setState({ showInfo: false })}
                  className="flex-fill"
                >
                  타임라인
                </MenuButton>
              </div>
              {this.state.showInfo
                ? this.renderInfo(profile)
                : this.renderTimeline()}
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const MenuButton = styled.div`
  text-align: center;
  padding: 10px;
  height: 40px;
  background-color: lightgray;
`

ProfileDetail.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const posts = Object.values(state.post.posts).filter(post => {
    return post.user._id === state.profile.profile.user._id
  })

  return {
    profile: state.profile,
    auth: state.auth,
    post: { isFetching: state.post.isFetching, posts }
  }
}

export default connect(
  mapStateToProps,
  {
    getProfileByHandle,
    getPosts
  }
)(ProfileDetail)
