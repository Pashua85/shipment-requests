import styled from 'styled-components';

export const Container = styled.div``;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableRow = styled.tr<{isActive: boolean}>`
  background-color: ${({isActive}) => isActive ? `rgba(100, 149, 237, .2)` : ``};
  cursor: pointer;

  &:hover {
    background-color: ${({isActive}) => isActive ? `rgba(100, 149, 237, .2)` : `rgba(100, 149, 237, .05)`};
  }
`;

export const TableHead = styled.thead`
`;

export const TableHeader = styled.th`
  background-color: cornflowerblue;
  color: snow;
  padding: 5px;
  padding-left: 10px;
  
  &:not(:first-child) {
    border-left: 1px solid snow;
  }
`;

export const TableBody = styled.tbody``;

export const TableCell = styled.td`
  border: 1px solid cornflowerblue;
  padding: 3px;

  &:last-child {
    word-break: break-all;
  }
`;

export const Link = styled.a`
  color: royalblue;
`;

export const FormBackground = styled.div`
  background-color: rgba(255, 255, 255, .9);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
`;

export const FormWrapper = styled.div`
  position: fixed;
  left: calc(50% - 250px);
  top: 100px;
`;
