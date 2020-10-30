import styled from 'styled-components';
import {DEVICE} from '../../variables';

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

  @media ${DEVICE.MOBILE} {
    border: 1px solid cornflowerblue;
    background-color: ${({isActive}) => isActive ? `turquoise` : ``};
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    &:first-child {
      border-top: none;
    }

    &:nth-child(odd) {
      background-color: ${({isActive}) => isActive ? `turquoise` : `rgba(100, 149, 237, .2)`};
    }

    &:nth-child(even) {
      background-color: ${({isActive}) => isActive ? `turquoise` : ``};
    }
  }
`;

export const TableHead = styled.thead`

  @media ${DEVICE.MOBILE} {
    display: none;
  }
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

export const TableBody = styled.tbody`
  
  @media ${DEVICE.TAB_LAND} {
    font-size: 14px;
  }
`;

export const TableCell = styled.td`
  border: 1px solid cornflowerblue;
  padding: 3px;
  
  &:nth-child(3), &:nth-child(4), &:nth-child(7) {
    word-break: break-all;
  }

  @media ${DEVICE.MOBILE} {
    border: none;
    position: relative;
    padding-left: 150px;
    min-height: 25px;
    
    &:not(:last-child) {
      border-bottom: 1px solid cornflowerblue;
    }

    &:before {
      border-right: 1px solid cornflowerblue;
      content: '';
      left: 0;
      line-height: 24px;
      font-size: 10px;
      height: 100%;
      position: absolute;
      text-transform: uppercase;
      top: 0;
      padding-left: 10px;
      vertical-align: middle;
      width: 140px;

    }

    &:nth-child(1):before {
      content: '№'
    }

    &:nth-child(2):before {
      content: 'Дата и время заявки'
    }

    &:nth-child(3):before {
      content: 'Фирма клиента'
    }

    &:nth-child(4):before {
      content: 'Перевозчик'
    }

    &:nth-child(5):before {
      content: 'Тел. перевозчика'
    }

    &:nth-child(6):before {
      content: 'Код в АТИ'
    }

    &:nth-child(7):before {
      content: 'Комментарии'
    }
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
  width: fit-content;
  left: calc(50% - 250px);
  top: 80px;

  @media ${DEVICE.TAB_LAND} {
    top: 40px;
  }

  @media ${DEVICE.TAB_PORT} {
    top: 30px;
  }

  @media ${DEVICE.MOBILE} {
    width: 90%;
    left: 5%;
    top: 20px;
  }

  @media ${DEVICE.MOBILE_S} {
    top: 10px;
  }
`;
