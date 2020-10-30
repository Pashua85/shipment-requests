import styled from 'styled-components';

export const Container = styled.div``;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

export const TableRow = styled.tr``;

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
`;