import React from 'react';
import {Input, Container, ErrorMessage, Label} from './style';
/**
 * @memberof InputGroup
 * @interface {object} IInputGroupProps
 * @property {string} type  значение атрибута [type] для инпута
 * @property {value} value значение для инпута
 * @property {string} label текст для надписи над полем инпута
 * @property {string} placeholder значение атрибута [placeholder] для инпута
 * @property {string} errorMessage текст, который будет отображаться в поле инпута и сообщать пользователю о попытке ввести некоректное значение или отправить форму, не заполнив обязательных полей
 * @property {function} onChange callback-функция на изменение значения инпута
 * @property {boolean} disabled значение атрибута [disabled] для инпута
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