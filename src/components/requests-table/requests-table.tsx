import React, {useContext, useEffect} from 'react';
import {RequestsContext} from '../../context/requestsContext';

const RequestsTable: React.FC = () => {
  const {dispatch} = useContext(RequestsContext);

  useEffect(() => {
    fetch(`http://localhost:3006/requests`, {cache: "reload"})
        .then(res => res.json())
        .then(result => {
          console.log(result)
          dispatch({
            type: `SET_REQUESTS`,
            payload: result
          })
        })
  }, [dispatch])

  return (
    <div></div>
  )
};

export default RequestsTable;
