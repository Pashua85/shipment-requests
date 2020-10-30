import styled from 'styled-components';
import {DEVICE} from '../../variables';

export const Container = styled.div`
  
`;

export const FormWrapper = styled.div`
  margin: 0 auto;
  width: fit-content;

  @media ${DEVICE.MOBILE} {
    width: 100%;
  }
`;

export const OpenButton = styled.button`
  background-color: transparent;
  border: 1px solid lightsteelblue;
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
    width: 100%;
    padding: 0;
  }
`;

