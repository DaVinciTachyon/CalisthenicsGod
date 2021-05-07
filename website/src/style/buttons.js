import styled from 'styled-components';
import General, { Background, Shadow, Border, Success, Error } from './colours';

const Button = styled.div`
  text-decoration: none;
  border-radius: 1rem;
  text-align: center;
  border: ${Border.secondary};
  color: ${Background.primary};
  background: ${General.primary.standard};
  font-size: 1.1rem;
  box-shadow: 0 0 0.5rem 0.25rem ${Shadow.primary};
  min-width: 60%;
  margin: 0.2rem;

  :hover {
    border: 0.1rem solid ${General.primary.dark};
    color: ${Background.primary};
    background: ${Success.primary};
    box-shadow: 0 0 0.5rem 0.25rem ${Shadow.secondary};
  }

  :active {
    border: 0.1rem solid ${Success.primary};
    color: ${Success.primary};
    background: ${Background.primary};
  }
`;

const SecondaryButton = styled(Button)`
  border: ${Border.secondary};
  color: ${General.primary.standard};
  background: ${Background.primary};

  :hover {
    border: 0.1rem solid ${Success.primary};
    color: ${Success.primary};
    background: ${Background.primary};
  }

  :active {
    border: 0.1rem solid ${Background.primary};
    color: ${Background.primary};
    background: ${Success.primary};
  }
`;

const ErrorButton = styled(Button)`
  border: 0.1rem solid ${Error.primary};
  color: ${Error.primary};
  background: ${Background.primary};

  :hover {
    border: 0.1rem solid ${Background.primary};
    color: ${Background.primary};
    background: ${Error.primary};
  }

  :active {
    border: 0.1rem solid ${Error.secondary};
    color: ${Error.secondary};
    background: ${Background.primary};
  }
`;

const DeleteButton = styled(Button)`
  border: 0.1rem solid ${Background.primary};
  color: ${Background.primary};
  background: ${Error.primary};

  :hover {
    border: 0.1rem solid ${Error.primary};
    color: ${Error.primary};
    background: ${Background.primary};
  }

  :active {
    border: 0.1rem solid ${Background.primary};
    color: ${Background.primary};
    background: ${Error.secondary};
  }
`;

const SuccessButton = styled(Button)`
  border: 0.1rem solid ${Background.primary};
  color: ${Background.primary};
  background: ${Success.primary};

  :hover {
    border: 0.1rem solid ${Success.primary};
    color: ${Success.primary};
    background: ${Background.primary};
  }

  :active {
    border: 0.1rem solid ${Background.primary};
    color: ${Background.primary};
    background: ${Success.secondary};
  }
`;

export { Button, SecondaryButton, ErrorButton, DeleteButton, SuccessButton };
