import React, {SyntheticEvent, ChangeEvent} from 'react';
import {Form, InputWrapper, ButtonRow, SubmitButton, CancelButton, TextArea} from './style';
import InputGroup from '../input-group/input-group';

/**
 * @memberof RequestFormView
 * @interface {object} IRequestFormViewProps
 * @property {string} applyTime Дата и время получения заявки от клиента
 * @property {string} clientFirm Название фирмы клиента
 * @property {string} transporter ФИО перевозчика
 * @property {string} transporterPhone Контактный телефон перевозчика
 * @property {string} comments Комментарии
 * @property {string} codeATI ATI код сети перевозчика
 * @property {"update" | "create"} formName название(назначение) формы: изменить существующую заявку или создать новую
 * @property {string} phoneError сообщение об ошибке в поле для телефона перевозчика
 * @property {string} codeATIError сообщение об ошибке в поле для кода из ATI
 * @property {string} clientFirmError сообщение об ошибке в поле с названием фирмы клиента
 * @property {string} transporterError сообщение об ошибке в поле с ФИО перевозчика
 * @property
 */
interface IRequestFormViewProps {
  clientFirm: string,
  transporter: string,
  transporterPhone: string,
  applyTime: string,
  formName: `update` | `create`,
  comments: string,
  codeATI: string,
  onFormSubmit: (e: SyntheticEvent) => void,
  onClientFirmChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onTransporterChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onPhoneChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onDateTimeChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onCommentsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
  onCodeATIChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onCancelClick: () => void,
  phoneError: string,
  codeATIError: string,
  clientFirmError: string,
  transporterError: string
}

/**
 * @component
 */
const RequestFormView: React.FC<IRequestFormViewProps> = ({
  onFormSubmit, clientFirm, onClientFirmChange, transporter, onTransporterChange, phoneError, transporterPhone, onPhoneChange, applyTime, onDateTimeChange,
  formName, comments, onCommentsChange, codeATI, onCodeATIChange, codeATIError, clientFirmError, transporterError, onCancelClick
}) => {
  return (
    <Form onSubmit={onFormSubmit} autoComplete="off">
      <InputWrapper>
        <InputGroup 
          type="datetime-local"
          value={applyTime}
          label="Дата и время получения заявки"
          onChange={onDateTimeChange}
          disabled={formName === `update`}
        />
      </InputWrapper>
      <InputWrapper>
        <InputGroup
          type="text"
          value={clientFirm}
          label="Название фирмы клиента"
          onChange={onClientFirmChange}
          errorMessage={clientFirmError}
        />
      </InputWrapper>
      <InputWrapper>
        <InputGroup
          type="text"
          value={transporter}
          label="ФИО перевозчика"
          onChange={onTransporterChange}
          errorMessage={transporterError}
        />
      </InputWrapper>
      <InputWrapper>
        <InputGroup
          type="text"
          value={transporterPhone}
          label="Телефон перевозчика"
          onChange={onPhoneChange}
          errorMessage={phoneError}
        />
      </InputWrapper>
      <InputWrapper>
        <InputGroup 
          type="text"
          value={codeATI}
          label="Код в АТИ"
          onChange={onCodeATIChange}
          errorMessage={codeATIError}
        />
      </InputWrapper>
      <InputWrapper>
        <TextArea
          value={comments}
          onChange={onCommentsChange}
          placeholder="Комментарии"
          rows={3}
        />
      </InputWrapper>

      <ButtonRow>
        <SubmitButton type="submit">
          { formName === `create` ? `Добавить` : `Изменить`}
        </SubmitButton>
        <CancelButton type="reset" onClick={onCancelClick}>
          Отмена
        </CancelButton>
      </ButtonRow>
    </Form>
  )
}

export default RequestFormView;