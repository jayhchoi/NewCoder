import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

import Page from '../../wrappers/Page'

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
        <div key={index} className="mb-4">
          <ReactMarkdown source={post} />
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
              <div className="py-4">{this.renderPosts()}</div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default About
