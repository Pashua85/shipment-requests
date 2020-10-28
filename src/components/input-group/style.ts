import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  border: 1px solid steelblue;
  border-radius: 4px;
  font-size: 18px;
  height: 60px;
  line-height: 44px;
  padding-left: 20px;
  vertical-align: middle;
  width: 100%;
  &::placeholder {
    font-size: 18px;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  text-transform: uppercase;
`;

export const ErrorMessage = styled.div`
  bottom: 2px;
  color: red;
  font-size: 10px;
  left: 20px;
  position: absolute;
  text-transform: uppercase;
`;