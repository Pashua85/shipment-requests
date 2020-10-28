import React, {useState, useEffect} from 'react';
import {IRequest} from '../../types';

const App: React.FC = () => {
  const [requests, setRequests] = useState<IRequest[]>([]);

  useEffect(() => {
    fetch(`http://localhost:1234/requests`)
        .then(res => res.json())
        .then(result => {
          setRequests(result);
        })
  }, [])

  return (
    <h1>Заявки</h1>
  )
}

export default App;