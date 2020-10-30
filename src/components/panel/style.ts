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

export const SelectGroup = styled.div`
`;

export const SearchSelect = styled.select`
  border: 1px solid steelblue;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 5px;
`;

export const Label = styled.label`
  font-size: 14px;
  text-transform: uppercase;
`;