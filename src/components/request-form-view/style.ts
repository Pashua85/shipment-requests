import styled from 'styled-components';

export const Form = styled.form`
  background-color: white;
  border-radius: 5px;
  border: 1px solid lightsteelblue;
  padding: 30px; 
  width: 500px;
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 14px;
  text-transform: uppercase;
`;

export const TextArea = styled.textarea`
  border: 1px solid steelblue;
  border-radius: 4px;
  font-size: 18px;
  padding: 20px;
  width: 100%;
  &::placeholder {
    font-size: 18px;
  }
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SubmitButton = styled.button`
  background-color: lightsteelblue;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  height: 40px;
  outline: none;
  padding: 0 40px;
  user-select: none;
  &:hover {
    background-color: lightgray;
  }
  &:active {
    color: darkslategray;
  }
`;

export const CancelButton = styled.button`
  background-color: white;
  border: 1px solid lightsteelblue;
  border-radius: 5px;
  color: darkgray;
  cursor: pointer;
  display: block;
  height: 40px;
  outline: none;
  padding: 0 40px;
  user-select: none;
  &:hover {
    color: darkslategray;
  }
  &:active {
    color: darkgray;
  }
`;