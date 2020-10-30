import React, {useContext, useEffect, useState, ChangeEvent} from 'react';
import {RequestsContext, IRequest} from '../../context/requestsContext';
import {Container, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Link} from './style';
import Panel from '../panel/panel';

export type SearchParam = `clientFirm` | `transporter` | `codeATI` | `comments`;

const Requests: React.FC = () => {
  const {state, dispatch} = useContext(RequestsContext);
  const [searchWord, setSearchWord] = useState(``);
  const [searchParam, setSearchParam] = useState<SearchParam>(`clientFirm`);
  const [filteredRequests, setFilteredRequests] = useState<IRequest[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3006/requests`, {cache: "reload"})
        .then(res => res.json())
        .then(result => {
          dispatch({
            type: `SET_REQUESTS`,
            payload: result
          })
        })
  }, [dispatch])




  useEffect(() => {
    if(searchWord === ``) {
      setFilteredRequests([...state.requests]);
    } else {
      const filterByWord = (request: IRequest): boolean => {
        return request[searchParam].toLowerCase().includes(searchWord.toLowerCase());
      };
      setFilteredRequests([...state.requests].filter(filterByWord));
    }
  }, [state, searchParam, searchWord]); 

  const handleSearchWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSearchParamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParam(e.target.value as SearchParam)
  }

  return (
    <Container>
      <Panel
        searchWord={searchWord}
        onSearchWordChange={handleSearchWordChange}
        searchParam={searchParam}
        onSearchParamChange={handleSearchParamChange}
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>№</TableHeader>
            <TableHeader>Дата получения</TableHeader>
            <TableHeader>Фирма клиента</TableHeader>
            <TableHeader>Перевозчик</TableHeader>
            <TableHeader>тел. перевозчика</TableHeader>
            <TableHeader>Код в АТИ</TableHeader>
            <TableHeader>Комментарии</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            filteredRequests.map(request => (
              <TableRow key={request.id}>
                <TableCell>{String(request.requestNumber).padStart(4, `0`)}</TableCell>
                <TableCell>{request.applyTime.replace(`T`, ` `)}</TableCell>
                <TableCell>{request.clientFirm}</TableCell>
                <TableCell>{request.transporter}</TableCell>
                <TableCell>{request.transporterPhone}</TableCell>
                <TableCell>
                  <Link href={`https://ati.su/firms/${request.codeATI}/info​`} target="_blank">
                    {Number(request.codeATI).toLocaleString()}
                  </Link>
                  
                </TableCell>
                <TableCell>{request.comments}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </Container>
  )
};

export default Requests;
