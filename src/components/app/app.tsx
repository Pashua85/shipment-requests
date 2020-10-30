import React from 'react';
import Requests from '../requests/requests';
import CreateRequestForm from '../create-request-form/create-request-form';
import Header from '../header/header';
import {RequestsContext, RequestsContextProvider} from '../../context/requestsContext';
import {GlobalStyles, Main, CreateFormWrapper} from './style';


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