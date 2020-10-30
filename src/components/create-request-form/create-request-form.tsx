import React, {useState, ChangeEvent, SyntheticEvent, useEffect, useContext} from 'react';
import {Container, OpenButton, FormWrapper} from './style';
import {RequestsContext} from '../../context/requestsContext';
import {v4 as uuidv4} from 'uuid';
import {IRequest} from '../../context/requestsContext';
import RequestFormView from '../request-form-view/request-form-view';

const CreateRequestForm: React.FC = () => {
  const {dispatch} = useContext(RequestsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [clientFirm, setClientFirm] = useState(``);
  const [transporter, setTransporter] = useState(``);
  const [transporterPhone, setTransporterPhone] = useState(``);
  const [phoneError, setPhoneError] = useState(``);
  const [applyTime, setApplyTime] = useState(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16));
  const [comments, setComments] = useState(``);
  const [codeATI, setCodeATI] = useState(``);
  const [codeATIError, setCodeATIError] = useState(``);
  const [clientFirmError, setClientFirmError] = useState(``);
  const [transporterError, setTransporterError] = useState(``);

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
  }, [transporter])

  useEffect(() => {
    setApplyTime(new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16));
  }, [isOpen])

  const postRequest = () => {
    fetch(`http://localhost:3006/lastRequest`)
      .then(res => res.json())
      .then(result => {
        const newRequest: IRequest = {
          requestNumber: result.number + 1,
          id: uuidv4(),
          applyTime,
          clientFirm,
          transporter,
          transporterPhone,
          codeATI,
          comments
        }

        fetch(`http://localhost:3006/requests`, {
          method: `POST`,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newRequest)
        })
        .then(res => res.json())
        .then(result => {
          dispatch({
            type: `ADD_REQUEST`,
            payload: result
          });

          fetch(`http://localhost:3006/lastRequest`, {
            method: `PUT`,
            headers: {
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({number: result.requestNumber})
          })
          .then(() => {
            setClientFirm(``);
            setTransporter(``);
            setTransporterPhone(``);
            setComments(``);
            setCodeATI(``);
            setIsOpen(false);
          })
          .catch(() => {
            throw new Error();
          })
        })
        .catch(() => {
          throw new Error();
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

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
    if (validateClientFirm() && validateTransporter() && validatePhone() && validateCodeATI()) {
      console.log(`submit`);
      postRequest();
    }
  };

  return (
    <Container>
      {
        isOpen ?
        (<FormWrapper>
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
            applyTime={applyTime}
            onDateTimeChange={handleDateTimeChange}
            comments={comments}
            onCommentsChange={handleCommentsChange}
            codeATI={codeATI}
            onCodeATIChange={handleCodeATIChange}
            codeATIError={codeATIError}
            transporterError={transporterError}
            clientFirmError={clientFirmError}
            onCancelClick={() => {setIsOpen(false)}}
          />
        </FormWrapper>
        ) :
        (
          <OpenButton onClick={() => setIsOpen(true)}>
            Добавить заявку
          </OpenButton>
        )
      }
    </Container>
    
  )
};

export default CreateRequestForm;