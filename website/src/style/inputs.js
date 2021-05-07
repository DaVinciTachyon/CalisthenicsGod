import styled from 'styled-components';
import { Nutrients, Background } from './constants';

const Input = styled.input`
  border-radius: 5px;
  border-style: solid;
  border-width: ${(props) => (props.readOnly ? `0` : `3px`)};
  border-color: black;
  background-color: ${(props) =>
    props.readOnly ? `inherit` : Background.primary};
  text-align: center;
  margin: 0.5rem;
  padding: 0.2rem;
`;

const Text = styled(Input).attrs({
  type: 'text',
})``;

const Number = styled(Input).attrs({
  type: 'number',
})`
  max-width: 4rem;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Weight = styled(Number).attrs({
  min: 0,
  step: 0.1,
})``;

const Fat = styled(Weight)`
  background-color: ${Nutrients.fat.light};
  border-color: ${Nutrients.fat.dark};
`;

const Carbohydrate = styled(Weight)`
  background-color: ${Nutrients.carbohydrate.light};
  border-color: ${Nutrients.carbohydrate.dark};
`;

const Protein = styled(Weight)`
  background-color: ${Nutrients.protein.light};
  border-color: ${Nutrients.protein.dark};
`;

const Ethanol = styled(Weight)`
  background-color: ${Nutrients.ethanol.light};
  border-color: ${Nutrients.ethanol.dark};
`;

export { Text, Number, Weight, Fat, Carbohydrate, Protein, Ethanol };
