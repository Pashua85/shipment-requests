import React from 'react';
import {HeaderField, Container, Title} from './style';

/**
 * @component
 */
const Header: React.FC = () => {
  return (
    <HeaderField>
      <Container>
        <Title>Таблица заявок</Title>
      </Container>
    </HeaderField>
  )
}

export default Header;