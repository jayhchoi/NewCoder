import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
  min-height: 100vh;
}

body {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  font-size: ${props => props.theme.fontSizeDefault};
}
`

export default GlobalStyles
