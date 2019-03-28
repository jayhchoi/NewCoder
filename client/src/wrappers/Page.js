import React from 'react'
import styled from 'styled-components'

const Page = props => {
  return <StyledPage {...props}>{props.children}</StyledPage>
}

const StyledPage = styled.div`
  padding: 5rem 0;
  font-size: 1.6rem;
  margin-top: 8vh;
  min-height: 85vh;
  ${props => (props.dark ? 'background-color: #607D8B' : '')}

  h1 {
    font-size: 5rem;
  }

  h2 {
    font-size: 2.5rem;
  }

  button {
    font-size: 1.6rem;
  }
`

export default Page
