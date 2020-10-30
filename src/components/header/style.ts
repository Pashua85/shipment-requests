import styled from 'styled-components';
import {MAX_WIDTH, DEVICE} from '../../variables';


export const HeaderField = styled.header`
  background-color: cornflowerblue;
`;

export const Container = styled.div`
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  padding-bottom: 20px;
  padding-top: 30px;
  width: 80%;

  @media ${DEVICE.MOBILE} {
    padding-top: 25px;
    padding-bottom: 15px;
  }

  @media ${DEVICE.MOBILE} {
    width: 85%;
  }

  @media ${DEVICE.MOBILE_S} {
    width: 90%;
  }
`;

export const Title = styled.h1`
  color: snow;
  margin: 0;
  font-size: 40px;

  @media ${DEVICE.TAB_LAND} {
    font-size: 36px;
  }

  @media ${DEVICE.MOBILE} {
    font-size: 30px;
    line-height: 36px;
  }
`;