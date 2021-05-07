import styled from 'styled-components';
import { Shadow, Background } from './constants';

const Card = styled.div`
  box-shadow: 0 0.25rem 0.5rem 0 ${Shadow.primary};
  margin: 2rem;
  padding: 0.5rem;
  background: ${Background.primary};
  border-radius: 1rem;
  margin: auto;
  max-width: 95%;
`;

export default Card;
