import React, {useState, ChangeEvent, SyntheticEvent, useEffect} from 'react';
import RequestFormView from '../request-form-view/request-form-view';

const CreateRequestForm: React.FC = () => {
  const [clientFirm, setClientFirm] = useState(``);
  const [transporter, setTransporter] = useState(``);
  const [transporterPhone, setTransporterPhone] = useState(``);
  const [phoneError, setPhoneError] = useState(``);
  const [dateTimeString, setDateTimeString] = useState(new Date().toISOString().slice(0, 16));
  const [comments, setComments] = useState(``);
  const [codeATI, setCodeATI] = useState(``);
  const [codeATIError, setCodeATIError] = useState(``);

  useEffect(() => {
    setPhoneError(``);
  }, [transporterPhone]);

  useEffect(() => {
    setCodeATIError(``);
  }, [codeATI]);

  const handleClientFirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientFirm(e.target.value);
  }

  const handleTransporterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransporter(e.target.value);
  }

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const telephone = e.target.value;
    if (telephone === `` || /^[-+()0-9\b]+$/.test(telephone)) {
      setTransporterPhone(telephone);
    } else {
      setPhoneError(`вводите только цифры или символы + - ( )`)
    }
  }

  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateTimeString(e.target.value);
  }

  const handleCommentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);
  }

  const handleCodeATIChange = (e: ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    if (code === `` || /^[0-9\b]+$/.test(code)) {
      setCodeATI(code);
    } else {
      setCodeATIError(`вводите только цифры`)
    }
  }

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(`submit`);
  }

  return (
    <RequestFormView
      formName="create"
      clientFirm={clientFirm}
      transporter={transporter}
      onClientFirmChange={handleClientFirmChange}
      onTransporterChange={handleTransporterChange}
      onFormSubmit={handleFormSubmit}
      transporterPhone={transporterPhone}
      onPhoneChange={handlePhoneChange}
      phoneError={phoneError}
      dateTimeString={dateTimeString}
      onDateTimeChange={handleDateTimeChange}
      comments={comments}
      onCommentsChange={handleCommentsChange}
      codeATI={codeATI}
      onCodeATIChange={handleCodeATIChange}
      codeATIError={codeATIError}
    />
  )
};

export default CreateRequestForm;