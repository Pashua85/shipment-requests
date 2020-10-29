import React, {SyntheticEvent, ChangeEvent} from 'react';
import {Form, InputWrapper, ButtonRow, SubmitButton, CancelButton, TextArea} from './style';
import InputGroup from '../input-group/input-group';

interface RequestFormViewProps {
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
  phoneError: string,
  codeATIError: string,
  clientFirmError: string,
  transporterError: string
}

const RequestFormView: React.FC<RequestFormViewProps> = ({
  onFormSubmit, clientFirm, onClientFirmChange, transporter, onTransporterChange, phoneError, transporterPhone, onPhoneChange, applyTime, onDateTimeChange,
  formName, comments, onCommentsChange, codeATI, onCodeATIChange, codeATIError, clientFirmError, transporterError
}) => {
  return (
    <Form onSubmit={onFormSubmit} autoComplete="off">
      <InputWrapper>
        <InputGroup 
          type="datetime-local"
          value={applyTime}
          label="Дата и время получения заявки"
          onChange={onDateTimeChange}
          disabled={formName === `create`}
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
        <CancelButton type="reset">
          Отмена
        </CancelButton>
      </ButtonRow>
    </Form>
  )
}

export default RequestFormView;