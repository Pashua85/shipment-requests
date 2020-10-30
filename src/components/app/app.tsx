import React from 'react';
import Requests from '../requests/requests';
import CreateRequestForm from '../create-request-form/create-request-form';
import Header from '../header/header';
import {RequestsContextProvider} from '../../context/requestsContext';
import {GlobalStyles, Main} from './style';

/**
 * @component
 */
const App: React.FC = () => {

  return (
    <RequestsContextProvider>
      <GlobalStyles />
      <Header/>
      <Main>
        <CreateRequestForm />
        <Requests />
      </Main>
      
    </RequestsContextProvider>
  );
}

export default App;