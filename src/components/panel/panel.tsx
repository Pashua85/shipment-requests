import React, {ChangeEvent} from 'react';
import {Container, SearchInput, SearchGroup, SearchSelect, ButtonGroup, AddButton, DeleteButton} from './style';
import {IRequest} from '../../context/requestsContext';
import {SearchParam} from '../requests/requests';

interface PanelProps {
  searchWord: string,
  onSearchWordChange: (e: ChangeEvent<HTMLInputElement>) => void,
  searchParam: SearchParam,
  onSearchParamChange: (e: ChangeEvent<HTMLSelectElement>) => void,
  activeRequest: null | IRequest,
  onOpenClick: () => void,
  onDeleteClick: () => void
}

const Panel: React.FC<PanelProps> = ({searchWord, onSearchWordChange, searchParam, onSearchParamChange, activeRequest, onOpenClick, onDeleteClick}) => {

  return (
    <Container>
      <SearchGroup>
        <SearchInput
          type="text"
          placeholder="Поиск заявок"
          value={searchWord}
          onChange={onSearchWordChange}
        />
        <SearchSelect onChange={onSearchParamChange}>
          <option value="clientFirm">По фирме клиента</option>
          <option value="transporter">По перевозчику</option>
          <option value="codeATI">По коду в АТИ</option>
          <option value="comments">По комментарию</option>
        </SearchSelect>
      </SearchGroup>
      {
        activeRequest !== null ?
        (
          <ButtonGroup>
            <AddButton type="button" onClick={onOpenClick}>Изменить</AddButton>
            <DeleteButton type="button" onClick={onDeleteClick}>Удалить</DeleteButton>
          </ButtonGroup>
        ) : null
      }
    </Container>
  )
}

export default Panel;
