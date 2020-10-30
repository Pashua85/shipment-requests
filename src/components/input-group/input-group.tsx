import React from 'react';
import {Input, Container, ErrorMessage, Label} from './style';
/**
 * IInputGroupProps
 * @memberof InputGroup
 * @interface {object} IInputGroupProps
 * @property {string} type  type of the input
 * @property {value} value value for the input
 * @property {string} label text for the title above the input field
 * @property {string} placeholder placeholder for the input
 * @property {string} errorMessage message that will be shown when user tries to enter invalid value into input
 * @property {function} onChange callback function on input value change
 * @property {boolean} disabled value for the disabled attribute for the input
 */
interface IInputGroupProps {
  type: string,
  value: string,
  label: string,
  placeholder?: string,
  errorMessage?: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
  disabled?: boolean
}

/**
 * InputGroup
 * 
 * @component 
 */
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