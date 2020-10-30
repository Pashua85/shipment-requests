import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const SearchGroup = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  /* align-items: flex-end; */
`;

export const SearchInput = styled.input`
  border: 1px solid steelblue;
  border-radius: 4px;
  font-size: 18px;
  height: 60px;
  line-height: 44px;
  margin-right: 30px;
  padding-left: 20px;
  vertical-align: middle;
  width: 100%;
  &::placeholder {
    font-size: 18px;
  }
`;

export const SearchSelect = styled.select`
  border: 1px solid steelblue;
  background-color: transparent;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 5px;
`;

export const ButtonGroup = styled.div`
  align-self: center;
  display: flex;
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
`;