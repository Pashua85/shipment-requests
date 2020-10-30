import React, {useContext, useEffect, useState, ChangeEvent, SyntheticEvent} from 'react';
import {RequestsContext, IRequest} from '../../context/requestsContext';
import {Container, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Link, FormWrapper, FormBackground} from './style';
import Panel from '../panel/panel';
import UpdateRequestForm from '../update-request-form/update-request-form';
import { request } from 'http';

export type SearchParam = `clientFirm` | `transporter` | `codeATI` | `comments`;

const Requests: React.FC = () => {
  const {state, dispatch} = useContext(RequestsContext);
  const [searchWord, setSearchWord] = useState(``);
  const [searchParam, setSearchParam] = useState<SearchParam>(`clientFirm`);
  const [filteredRequests, setFilteredRequests] = useState<IRequest[]>([]);
  const [activeId, setActiveId] = useState(``);
  const [activeRequest, setActiveRequest] = useState<IRequest | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

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
    const handleDocumentClick = (e: MouseEvent) => {
      if(!(e.target as HTMLElement).closest(`main`)) {
        setActiveRequest(null);
        setActiveId(``);
      }
    };
    document.body.addEventListener(`click`, handleDocumentClick)

    return () => {
      document.body.removeEventListener(`click`, handleDocumentClick);
    }
  }, [])

  useEffect(() => {
    if(searchWord === ``) {
      setFilteredRequests([...state.requests]);
    } else {
      const filterByWord = (request: IRequest): boolean => {
        return String(request[searchParam]).toLowerCase().includes(searchWord.toLowerCase());
      };
      setFilteredRequests([...state.requests].filter(filterByWord));
    }
  }, [state, searchParam, searchWord]); 

  const deleteRequest = () => {
    if(activeRequest !== null) {
      fetch(`http://localhost:3006/requests/${activeRequest.id}`, {
        method: `DELETE`
      })
      .then(() => {
        dispatch({
          type: `DELETE_REQUEST`,
          payload: `${activeRequest.id}`
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  const handleSearchWordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSearchParamChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSearchParam(e.target.value as SearchParam)
  }

  const handleDeleteClick = () => {
    deleteRequest();
    setActiveId(``);
    setActiveRequest(null);
  }

  const handleItemClick = (request: IRequest) => {
    setActiveId(request.id);
    setActiveRequest(request);
  }

  return (
    <Container>
      <Panel
        searchWord={searchWord}
        onSearchWordChange={handleSearchWordChange}
        searchParam={searchParam}
        onSearchParamChange={handleSearchParamChange}
        activeRequest={activeRequest}
        onOpenClick={() => setIsFormOpen(true)}
        onDeleteClick={handleDeleteClick}
      />
      <Table>
        <TableHead>
          <TableRow isActive={false}>
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
              <TableRow key={request.id} onClick={() => {handleItemClick(request)}} isActive={request.id === activeId}>
                <TableCell>{String(request.requestNumber).padStart(4, `0`)}</TableCell>
                <TableCell>{request.applyTime.replace(`T`, ` `)}</TableCell>
                <TableCell>{request.clientFirm}</TableCell>
                <TableCell>{request.transporter}</TableCell>
                <TableCell>
                  <Link href={`tel:${request.transporterPhone}`}>
                    {request.transporterPhone}
                  </Link>
                </TableCell>
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
      {
        (activeRequest !== null) && isFormOpen ?
        (
          <FormBackground>
            <FormWrapper>
              <UpdateRequestForm request={activeRequest} onCloseClick={() => setIsFormOpen(false)} />
            </FormWrapper>
          </FormBackground>
          
        ) : null
      }
    </Container>
  )
};

export default Requests;
