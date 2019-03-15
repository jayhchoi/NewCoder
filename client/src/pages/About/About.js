import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'

import about from './about.md'
import Page from '../../wrappers/Page'

class About extends Component {
  state = {
    about: ''
  }

  componentDidMount() {
    fetch(about)
      .then(res => res.text())
      .then(text => this.setState({ about: text }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Page>
        <div className="container">
          <div className="row">
            <div className="col-md-9 mx-auto">
              <h1 className="display-4">
                <i className="fas fa-bullhorn" /> 공지사항
              </h1>
              <hr />
              <div>
                <ReactMarkdown source={this.state.about} />
              </div>
            </div>
          </div>
        </div>
      </Page>
    )
  }
}

export default About
