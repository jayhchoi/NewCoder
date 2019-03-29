import styled from 'styled-components'

const Page = styled.div`
  padding: 5rem 0;
  margin-top: 8vh;
  min-height: 85vh;
  background-color: ${props =>
    (props.dark && props.theme.colorGreyDark) ||
    (props.light && props.theme.colorGreyLight) ||
    'white'};
`

export default Page
