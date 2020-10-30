import styled from 'styled-components';
import {DEVICE} from '../../variables';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SearchGroup = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;

  @media ${DEVICE.TAB_PORT} {
    margin-right: 10px;
  }

  @media ${DEVICE.MOBILE} {
    flex-direction: column;
    width: 50%;
    margin-right: none;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid steelblue;
  border-radius: 4px;
  height: 60px;
  line-height: 44px;
  margin-right: 30px;
  padding-left: 20px;
  vertical-align: middle;
  width: 100%;

  @media ${DEVICE.TAB_LAND} {
    height: 50px;
  }

  @media ${DEVICE.TAB_PORT} {
    margin-right: 20px;
    height: 40px;
  }

  @media ${DEVICE.MOBILE} {
    margin-bottom: 10px;
  }
`;

export const SearchSelect = styled.select`
  border: 1px solid steelblue;
  background-color: transparent;
  border-radius: 4px;
  padding-left: 5px;
  padding-right: 5px; 
  
  @media ${DEVICE.TAB_PORT} {
    height: 40px;
  }
`;

export const ButtonGroup = styled.div`
  align-self: center;
  display: flex;

  @media ${DEVICE.MOBILE} {
    flex-direction: column;
  }
`;

export const AddButton = styled.button`
  background-color: transparent;
  border: 1px solid lightsteelblue;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  height: 40px;
  margin-right: 30px;
  outline: none;
  padding: 0 40px;
  user-select: none;
  &:hover {
    background-color: lightgray;
  }
  &:active {
    color: darkslategray;
  }

  @media ${DEVICE.TAB_LAND} {
    padding: 0 25px;
    margin-right: 20px;
  }

  @media ${DEVICE.MOBILE} {
    margin-bottom: 10px;
    padding: 0 15px;
    width: 100%;
  }

  @media ${DEVICE.MOBILE_S} {
    padding: 0 10px;
  }
`;

export const DeleteButton = styled.button`
  background-color: white;
  border: 1px solid firebrick;
  border-radius: 5px;
  color: firebrick;
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
    color: red;
  }

  @media ${DEVICE.TAB_LAND} {
    padding: 0 25px;
  }

  @media ${DEVICE.MOBILE} {
    padding: 0 15px;
  }
`;