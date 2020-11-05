import React, {useContext, useEffect, useState, ChangeEvent} from 'react';
import {RequestsContext, IRequest} from '../../context/requestsContext';
import {Container, Table, TableHeader, TableHead, TableBody, TableCell, TableRow, Link, FormWrapper, FormBackground} from './style';
import Panel from '../panel/panel';
import UpdateRequestForm from '../update-request-form/update-request-form';

export type SearchParam = `clientFirm` | `transporter` | `codeATI` | `comments`;

/**
 * @component
 */
const Requests: React.FC = () => {
  const {state, dispatch} = useContext(RequestsContext);
  const [searchWord, setSearchWord] = useState(``);
  const [searchParam, setSearchParam] = useState<SearchParam>(`clientFirm`);
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

  /**
   * подаёт запрос на удаление заявки на сервер и диспатчит действие удаления в контекст с заявками
   */
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
  /**
   * изменяет значение searchWord в состоянии компонента в ответ на ввод слова в инпуте
   * @param {ChangeEvent<HTMLElement>} event событие изменения инпута со словом для поиска
   */
  const handleSearchWordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
  };
  
  /**
   * изменяет значение searchParam в состоянии компонента в ответ на изменение селекта
   * @param {ChangeEvent<HTMLSelectElement>} event событие изменения селекта с параметрами поиска
   */
  const handleSearchParamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSearchParam(event.target.value as SearchParam)
  }

  /**
   * обрабатывает клик по кнопке для удаления заявки
   */
  const handleDeleteClick = () => {
    deleteRequest();
    setActiveId(``);
    setActiveRequest(null);
  }
  
  /**
   * фиксирует активную заявку в состояние компонента в ответ на клик по ней
   * @param {IRequest} request объект заявки
   */
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
            state.requests.map(request => {
              return String(request[searchParam]).toLowerCase().includes(searchWord.toLowerCase()) ?
              (
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
              ) : null;
            })
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
