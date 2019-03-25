import React from 'react'
import styled from 'styled-components'

const Page = props => {
  return <StyledPage {...props}>{props.children}</StyledPage>
}

const StyledPage = styled.div`
  padding: 40px 0;
  margin-top: 56px;
  min-height: 85vh;
  ${props => (props.dark ? 'background-color: #607D8B' : '')}
`

export default Page
