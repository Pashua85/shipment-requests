import React, {ChangeEvent} from 'react';
import {Container, SearchInput, SearchGroup, SearchSelect, Label, SelectGroup} from './style';
import {SearchParam} from '../requests/requests';

interface PanelProps {
  searchWord: string,
  onSearchWordChange: (e: ChangeEvent<HTMLInputElement>) => void,
  searchParam: SearchParam,
  onSearchParamChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const Panel: React.FC<PanelProps> = ({searchWord, onSearchWordChange, searchParam, onSearchParamChange}) => {
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
          <option value="selectFirm">По фирме клиента</option>
          <option value="transporter">По перевозчику</option>
          <option value="codeATI">По коду в АТИ</option>
          <option value="comments">По комментарию</option>
        </SearchSelect>
    
        
      </SearchGroup>
    </Container>
  )
}

export default Panel;
