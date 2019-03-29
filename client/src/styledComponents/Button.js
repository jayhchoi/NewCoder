import styled from 'styled-components'

const Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: ${props => props.theme.fontSizeDefault};
  padding: 0.5rem 2rem;
  margin: 1.5rem 0;
  border-radius: 5px;
  transition: all 0.1s;
  display: inline-block;

  /* if props.block */
  ${props => (props.block ? `display: block; width: 100%;` : '')}

  /* color */
  ${props =>
    (props.primary &&
      `
      background-color: ${props.theme.colorBlueLight};
      color: white;
    `) ||
    (props.secondary &&
      `
      background-color: ${props.theme.colorTeal};
      color: white;
    `)}

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    transform: translateY(-0.1rem);
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  }
`

export default Button
