import styled from 'styled-components';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  text-align: center;
  ${(props) => {
    if (props.isTitle) return `font-weight: bold;`;
  }}
`;

const Column = styled.div`
  grid-column: span ${(props) => props.span || 1};
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Subtitle = styled.div`
  color: var(--secondaryTitleColour);
  font-size: 0.8rem;
`;

export { Row, Column, Title, Subtitle };
