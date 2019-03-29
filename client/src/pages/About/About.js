import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'

import Page from '../../styledComponents/Page'

class About extends Component {
  state = {
    posts: [],
    isFetching: true
  }

  componentDidMount() {
    fetch(
      `https://api.github.com/repos/jayhchoi/newcoder-markdowns/contents/about`
    )
      .then(res => res.json())
      .then(data => {
        Promise.all(
          data.map(item =>
            fetch(
              `https://raw.githubusercontent.com/jayhchoi/newcoder-markdowns/master/about/${
                item.name
              }`
            )
          )
        )
          .then(responses => Promise.all(responses.map(res => res.text())))
          .then(data => this.setState({ posts: data, isFetching: false }))
      })
      .catch(err => console.log(err))
  }

  renderPosts() {
    if (this.state.isFetching) return <p>불러오는 중입니다...</p>

    return this.state.posts.map((post, index) => {
      return (
        <div key={index} style={{ marginBottom: '3.5rem' }}>
          <ReactMarkdown source={post} escapeHtml={false} />
        </div>
      )
    })
  }

  render() {
    return (
      <Page className="bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-9 mx-auto">
              <h1 className="display-4">
                <i className="fas fa-bullhorn" /> 공지사항
              </h1>
              <Posts className="py-4">{this.renderPosts()}</Posts>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

const Posts = styled.div`
  img {
    margin-bottom: 0.5rem;
    margin-right: 0.5%;
    border: solid pink 0.2rem;
  }

  @media (max-width: 575px) {
    img {
      width: 100%;
      margin: none 0;
    }

    video {
      width: 100%;
      height: auto;
    }
  }
`

export default About
