import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import _ from 'lodash'

import { Spinner } from '../../components'
import { Page } from '../../wrappers'

import { getProfiles } from '../../actions/profiles.action'
import Profile from './Profile'

class Profiles extends Component {
  state = {
    currentPage: 1,
    itemsPerPage: 6
  }

  componentDidMount() {
    this.props.getProfiles()
  }

  renderContent() {
    const { profiles, isFetching } = this.props
    const { itemsPerPage } = this.state
    const totalPages = Math.ceil(profiles.length / itemsPerPage)

    if (isFetching) {
      return <Spinner />
    } else {
      if (profiles.length === 0) {
        return (
          <h5 className="text-warning text-center mt-5">
            프로필을 찾을 수 없습니다.
          </h5>
        )
      } else {
        const { currentPage, itemsPerPage } = this.state

        const endIndex = currentPage * itemsPerPage
        const startIndex = endIndex - itemsPerPage

        const paginatedProfiles = profiles.slice(startIndex, endIndex)

        return (
          <div>
            <div className="row">
              {paginatedProfiles.map(profile => (
                <Profile key={profile._id} profile={profile} />
              ))}
            </div>
            {this.renderPagenation(totalPages)}
          </div>
        )
      }
    }
  }

  handlePageclick = e => {
    this.setState({ currentPage: Number(e.target.innerText) })
  }

  renderPagenation(totalPages) {
    const pageRange = Array.from(
      new Array(totalPages),
      (val, index) => index + 1
    )

    return (
      <nav aria-label="Page navigation" className="mt-4">
        <ul className="pagination justify-content-center">
          <li
            className={`page-item ${
              this.state.currentPage === 1 ? 'disabled' : ''
            }`}
          >
            <span
              onClick={() =>
                this.setState({
                  currentPage: this.state.currentPage - 1
                })
              }
              className="page-link"
            >
              이전
            </span>
          </li>
          {pageRange.map(page => (
            <li
              key={page}
              className={`page-item ${
                this.state.currentPage === page ? 'active' : ''
              }`}
            >
              <span onClick={this.handlePageclick} className="page-link">
                {page}
              </span>
            </li>
          ))}
          <li
            className={`page-item ${
              this.state.currentPage === pageRange.length ? 'disabled' : ''
            }`}
          >
            <span
              onClick={() =>
                this.setState({
                  currentPage: this.state.currentPage + 1
                })
              }
              className="page-link"
            >
              다음
            </span>
          </li>
        </ul>
      </nav>
    )
  }

  render() {
    return (
      <Page dark>
        <Helmet>
          <title>NewCoder | 회원목록</title>
        </Helmet>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center text-white">
                뉴코더 회원목록
              </h1>
              <p className="lead text-center text-white">
                다른 회원들의 프로필을 확인해 보세요
              </p>
              {this.renderContent()}
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
  return {
    isFetching: state.profile.isFetching,
    profiles: _.shuffle(Object.values(state.profile.profiles))
  }
}

export default connect(
  mapStateToProps,
  {
    getProfiles
  }
)(Profiles)
