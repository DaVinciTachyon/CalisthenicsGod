import React from 'react';
import styled from 'styled-components';
import { Background, Text } from './constants';

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
  text-align: center;
  font-weight: ${(props) => (props.isTitle ? `bold` : 'normal')};
  padding: 0.2rem;
  background-color: ${(props) => props.backgroundColor || 'inherit'};

  &.input {
    background-color: ${Text.tertiary.alternative};
  }
  &.emphasis {
    background-color: ${Background.secondary};
  }
`;

const Column = styled.div`
  grid-column: span ${(props) => props.span || 1};
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns || 1}, 1fr);
  text-align: center;
  background-color: inherit;
`;

const Title = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
`;

const Subtitle = styled.div`
  color: ${Text.title.secondary};
  font-size: 0.8rem;
`;

const Section = styled(({ className, label, children, ...rest }) => (
  <div className={className} {...rest}>
    <span className="titleLabel">{label}</span>
    <div>{children}</div>
  </div>
))`
  border: 2px solid gray;
  border-radius: 5px;
  margin: 5px;
  position: relative;

  & span.titleLabel {
    font-weight: bold;
    margin: 10px;
    font-size: 1.1rem;
  }
`;

export { Row, Column, Title, Subtitle, Section };
