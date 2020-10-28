import React from 'react';
import RequestsTable from '../requests-table/requests-table';
import {RequestsContextProvider} from '../../context/requestsContext';


const App: React.FC = () => {

  return (
    <RequestsContextProvider>
      <RequestsTable />
    </RequestsContextProvider>
  );
}

export default App;