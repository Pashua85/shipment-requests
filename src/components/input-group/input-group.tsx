import React from 'react';
import {Input, Container, ErrorMessage, Label} from './style';

interface IInputGroupProps {
  type: string,
  value: string,
  label: string,
  placeholder?: string,
  errorMessage?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean
}

const InputGroup: React.FC<IInputGroupProps> = ({value, label, placeholder, errorMessage = null, onChange, type, disabled = false}) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {
        errorMessage !== null ?
        <ErrorMessage>{errorMessage}</ErrorMessage> : null
      }
    </Container>
  )
};

export default InputGroup;