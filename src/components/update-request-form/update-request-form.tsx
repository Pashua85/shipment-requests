import React, {useState, ChangeEvent, SyntheticEvent, useEffect, useContext} from 'react';
import {IRequest, RequestsContext} from '../../context/requestsContext';
import RequestFormView from '../request-form-view/request-form-view';

interface FormProps {
  request: IRequest,
  onCloseClick: () => void
}

const UpdateRequestForm: React.FC<FormProps> = ({request, onCloseClick}) => {
  const {dispatch} = useContext(RequestsContext);
  const [clientFirm, setClientFirm] = useState(request.clientFirm);
  const [transporter, setTransporter] = useState(request.transporter);
  const [applyTime, setApplyTime] = useState(request.applyTime);
  const [comments, setComments] = useState(request.comments);
  const [codeATI, setCodeATI] = useState(request.codeATI);
  const [transporterPhone, setTransporterPhone] = useState(request.transporterPhone);
  const [codeATIError, setCodeATIError] = useState(``);
  const [clientFirmError, setClientFirmError] = useState(``);
  const [transporterError, setTransporterError] = useState(``);
  const [phoneError, setPhoneError] = useState(``);

  useEffect(() => {
    setPhoneError(``);
  }, [transporterPhone]);

  useEffect(() => {
    setCodeATIError(``);
  }, [codeATI]);

  useEffect(() => {
    setClientFirmError(``);
  }, [clientFirm]);

  useEffect(() => {
    setTransporterError(``);
  }, [transporter]);

  const validateClientFirm = () => {
    if(clientFirm.length === 0) {
      setClientFirmError(`Укажите название фирмы клиента`);
      return false;
    } else {
      return true;
    }
  };

  const validateTransporter = () => {
    if(transporter.length === 0) {
      setTransporterError(`Укажите ФИО перевозчика`);
      return false;
    } else {
      return true;
    }
  };

  const validatePhone = () => {
    if(transporterPhone.length === 0) {
      setPhoneError(`Укажите номер телефона перевозчика`);
      return false;
    } else {
      return true;
    }
  }

  const validateCodeATI = () => {
    if(codeATI.length === 0) {
      setCodeATIError(`Укажите код в АТИ`);
      return false;
    } else {
      return true;
    }
  }

  const putRequest = () => {
    const newRequest: IRequest = {
      id: request.id,
      requestNumber: request.requestNumber,
      applyTime,
      clientFirm,
      transporter,
      transporterPhone,
      codeATI,
      comments
    };

    fetch(`http://localhost:3006/requests/${request.id}`, {
      method: `PUT`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newRequest)
    })
    .then(res => res.json())
    .then(result => {
      dispatch({
        type: `CHANGE_REQUEST`,
        payload: result
      });
    })
    .then(() => {
      onCloseClick();
    })
    .catch(err => {
      console.log(err)
    })
  }


  const handleClientFirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientFirm(e.target.value);
  };

  const handleTransporterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransporter(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const telephone = e.target.value;
    if (telephone === `` || /^[-+()0-9\b]+$/.test(telephone)) {
      setTransporterPhone(telephone);
    } else {
      setPhoneError(`вводите только цифры или символы + - ( )`)
    }
  };

  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApplyTime(e.target.value);
  };

  const handleCommentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);
  };

  const handleCodeATIChange = (e: ChangeEvent<HTMLInputElement>) => {
    const code = e.target.value;
    if (code === `` || /^[0-9\b]+$/.test(code)) {
      setCodeATI(code);
    } else {
      setCodeATIError(`вводите только цифры`);
    }
  };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (validateClientFirm() && validateCodeATI() && validatePhone() && validateTransporter) {
      putRequest();
    }
  }

  return (
    <RequestFormView
      formName="update"
      clientFirm={clientFirm}
      transporter={transporter}
      onClientFirmChange={handleClientFirmChange}
      onTransporterChange={handleTransporterChange}
      onFormSubmit={handleFormSubmit}
      transporterPhone={transporterPhone}
      onPhoneChange={handlePhoneChange}
      phoneError={phoneError}
      applyTime={applyTime}
      onDateTimeChange={handleDateTimeChange}
      comments={comments}
      onCommentsChange={handleCommentsChange}
      codeATI={codeATI}
      onCodeATIChange={handleCodeATIChange}
      codeATIError={codeATIError}
      transporterError={transporterError}
      clientFirmError={clientFirmError}
      onCancelClick={onCloseClick}
    />
  )
}

export default UpdateRequestForm;