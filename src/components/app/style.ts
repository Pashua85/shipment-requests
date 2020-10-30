import styled, {createGlobalStyle} from 'styled-components';
import {MAIN_FONT_COLOR, MAX_WIDTH, DEVICE} from '../../variables';

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }
  body {
    box-sizing: border-box;
    color: ${MAIN_FONT_COLOR};
    height: 100%;
    line-height: 130%;
    font-family: 'Roboto','Work-Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    font-size: 18px;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    @media ${DEVICE.TAB_LAND} {
      font-size: 16px;
    }

    @media ${DEVICE.TAB_PORT} {
      font-size: 14px;
    }
  }
`;

export const Main = styled.main`
  padding-top: 40px;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  width: 80%;

  @media ${DEVICE.TAB_LAND} {
    padding-top: 30px;
  }

  @media ${DEVICE.MOBILE} {
    padding-top: 20px;
    width: 85%;
  }

  @media ${DEVICE.MOBILE_S} {
    width: 90%;
  }
`;

export const CreateFormWrapper = styled.div`
  margin-bottom: 30px;

  @media ${DEVICE.MOBILE} {
    margin-bottom: 20px;
  }
`;



