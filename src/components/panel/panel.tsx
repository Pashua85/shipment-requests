import React, {ChangeEvent} from 'react';
import {Container, SearchInput, SearchGroup, SearchSelect, ButtonGroup, AddButton, DeleteButton} from './style';
import {IRequest} from '../../context/requestsContext';
import {SearchParam} from '../requests/requests';

/**
 * IPanelProps
 * @memberof Panel
 * @interface {object} IPanelProps
 * @property {string} searchWord значение инпута для поиска заявок по таблице
 * @property {`clientFirm` | `transporter` | `codeATI` | `comments`} searchParam значение селекта с вариантами параметра для поиска
 * @property {null | IRequest} activeRequest выбранная пользователем заявка, если таковая имеется
 * @property {function} onSearchWordChange callback-функция на изменение значения инпута с искомым словом
 * @property {function} onSearchParamChange callback-функция на изменение значения селекта селекта с вариантами параметра для поиска
 * @property {function} onOpenClick callback-функция на клик по кнопке для открытия формы для изменения выбранной заявки
 * @property {function} onDeleteClick callback-функция на клик по кнопке для удаления выбранной заявки
 */
interface IPanelProps {
  searchWord: string,
  onSearchWordChange: (e: ChangeEvent<HTMLInputElement>) => void,
  searchParam: SearchParam,
  onSearchParamChange: (e: ChangeEvent<HTMLSelectElement>) => void,
  activeRequest: null | IRequest,
  onOpenClick: () => void,
  onDeleteClick: () => void
}

/**
 * Panel
 * @component
 */
const Panel: React.FC<IPanelProps> = ({searchWord, onSearchWordChange, searchParam, onSearchParamChange, activeRequest, onOpenClick, onDeleteClick}) => {

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
