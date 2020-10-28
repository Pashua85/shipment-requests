import styled, {createGlobalStyle} from 'styled-components';
import {MAIN_FONT_COLOR} from '../../variables';

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
  }
`;

export const Main = styled.main`
  width: 80%;
  margin: 0 auto;
`;

