import styled from 'styled-components';
import {DEVICE} from '../../variables';

export const Form = styled.form`
  background-color: white;
  border-radius: 5px;
  border: 1px solid lightsteelblue;
  padding: 30px; 
  width: 500px;

  @media ${DEVICE.MOBILE} {
    width: 100%;
  }

  @media ${DEVICE.MOBILE_M} {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 20px;

  @media ${DEVICE.MOBILE_S} {
    margin-bottom: 10px;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid steelblue;
  border-radius: 4px;
  padding: 20px;
  width: 100%;
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

  @media ${DEVICE.MOBILE} {
    padding: 0 25px;
  }

  @media ${DEVICE.MOBILE_S} {
    padding: 0 20px;
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

  @media ${DEVICE.MOBILE} {
    padding: 0 25px;
  }

  @media ${DEVICE.MOBILE_S} {
    padding: 0 20px;
  }
`;