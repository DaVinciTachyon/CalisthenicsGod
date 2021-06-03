import styled from 'styled-components';
import { Background, Shadow, Success, Error, Colours } from './constants';

const Button = styled.button.attrs((props) => ({
  background: Colours.primary.standard,
  color: Background.primary,
  ['data-id']: props.dataId || 'button',
}))`
  text-decoration: none;
  border-radius: 1vw;
  text-align: center;
  border: 0.1rem solid ${(props) => props.color};
  color: ${(props) => props.color};
  background: ${(props) => props.background};
  box-shadow: 0 0 0.5rem 0.25rem ${Shadow.primary};
  margin: auto;
  min-width: 60%;
  height: 2vw;
  font-size: 1vw;

  &.secondary {
    min-width: 51%;
    font-size: 0.7vw;
  }

  &.maxWidth {
    width: 100%;
  }

  &.minWidth {
    width: fit-content;
    height: fit-content;
  }

  &.thin {
    height: 1vw;
    font-size: 0.5vw;
  }

  &:hover {
    border: 0.1rem solid ${(props) => props.background};
    color: ${(props) => props.background};
    background: ${(props) => props.color};
    box-shadow: 0 0 0.5rem 0.25rem ${Shadow.secondary};
  }

  &:active {
    border: 0.1rem solid ${(props) => props.color};
    color: ${(props) => props.color};
    background: ${(props) => props.background};
  }
`;

const ErrorButton = styled(Button)({
  background: Background.primary,
  color: Error.primary,
});

const DeleteButton = styled(Button)({
  background: Error.primary,
  color: Background.primary,
});

const SuccessButton = styled(Button)({
  background: Success.primary,
  color: Background.primary,
});

export { Button, ErrorButton, DeleteButton, SuccessButton };
