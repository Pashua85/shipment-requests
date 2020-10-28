import React from 'react';
import RequestsTable from '../requests-table/requests-table';
import CreateRequestForm from '../create-request-form/create-request-form';
import {RequestsContextProvider} from '../../context/requestsContext';
import {GlobalStyles, Main} from './style';


const App: React.FC = () => {

  return (

    <RequestsContextProvider>
      <GlobalStyles />
      <Main>
        <CreateRequestForm />
      </Main>
    </RequestsContextProvider>
  );
}

export default App;