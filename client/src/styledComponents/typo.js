import styled from 'styled-components'

export const HeadingOne = styled.h1`
  text-align: ${props => (props.textCenter && 'center') || null};
  color: ${props => (props.textWhite ? 'white' : 'inherit')};
  font-size: ${props => props.theme.fontSizeXL};
  margin-bottom: 2rem;
`

export const HeadingTwo = styled.h2`
  text-align: ${props => (props.textCenter && 'center') || null};
  color: ${props => (props.textWhite ? 'white' : 'inherit')};
  font-size: ${props => props.theme.fontSizeMedium};
  margin-bottom: 1.5rem;
`
