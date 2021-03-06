import React, {useState, ChangeEvent, SyntheticEvent, useEffect, useContext} from 'react';
import {Container, OpenButton, FormWrapper} from './style';
import {RequestsContext} from '../../context/requestsContext';
import {v4 as uuidv4} from 'uuid';
import {IRequest} from '../../context/requestsContext';
import RequestFormView from '../request-form-view/request-form-view';


/**
 * @component
 */
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

  /**
   * отправляет запрос о добавлении заявки на сервер и диспатчит событие добавления в контекст с заявками
   */
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

  /**
   * проверяет, ввел ли пользователь название фирмы клиента
   */
  const validateClientFirm = () => {
    if(clientFirm.length === 0) {
      setClientFirmError(`Укажите название фирмы клиента`);
      return false;
    } else {
      return true;
    }
  };

  /**
   * проверяет, ввел ли пользователь ФИО перевозчика
   */
  const validateTransporter = () => {
    if(transporter.length === 0) {
      setTransporterError(`Укажите ФИО перевозчика`);
      return false;
    } else {
      return true;
    }
  };

  /**
   * проверяет, ввел ли пользователь контактный телефон перевозчика
   */
  const validatePhone = () => {
    if(transporterPhone.length === 0) {
      setPhoneError(`Укажите номер телефона перевозчика`);
      return false;
    } else {
      return true;
    }
  }

  /**
   * проверяет, ввел ли пользователь код сети перевозчика из ATI
   */
  const validateCodeATI = () => {
    if(codeATI.length === 0) {
      setCodeATIError(`Укажите код в АТИ`);
      return false;
    } else {
      return true;
    }
  }

  /**
   * изменяет значение clientFirm в состоянии компонента в ответ на изменение значения соответсвующего инпута
   * @param {ChangeEvent<HTMLInputElement>} event событие изменение инпута с название фирмы клиента
   */
  const handleClientFirmChange = (event: ChangeEvent<HTMLInputElement>) => {
    setClientFirm(event.target.value);
  };

  /**
   * изменяет значение transporter в состоянии компонента в ответ на изменение значения соответсвующего инпута
   * @param {ChangeEvent<HTMLInputElement>} event событие изменение инпута с ФИО первозчика
   */
  const handleTransporterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTransporter(event.target.value);
  };

  /**
   * проверяет, вводит ли пользователь валидное значение, и если да, то изменяет на него traporterPhone в состоянии компонента
   * @param {ChangeEvent<HTMLInputElement>} event событие изменение инпута с контактным телефоном перевозчика
   */
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    const telephone = event.target.value;
    if (telephone === `` || /^[-+()0-9\b]+$/.test(telephone)) {
      setTransporterPhone(telephone);
    } else {
      setPhoneError(`вводите только цифры или символы + - ( )`)
    }
  };

  /**
   * изменяет значение applyTime в состоянии компонента в ответ на изменение значения соответсвующего инпута
   * @param {ChangeEvent<HTMLInputElement>} event событие изменение инпута с датой и временем приёма заявки
   */
  const handleDateTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setApplyTime(event.target.value);
  };

  /**
   * изменяет значение comments в состоянии компонента в ответ на изменение значения тега textarea
   * @param {ChangeEvent<HTMLInputElement>} event событие изменение textarea с комментариями
   */
  const handleCommentsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComments(e.target.value);
  };

  /**
   * проверяет, вводит ли пользователь валидное значение, и если да, то изменяет на него codeATI в состоянии компонента
   * @param {ChangeEvent<HTMLInputElement>} event событие изменение инпута с кодом сети перевозчика из ATI
   */
  const handleCodeATIChange = (event: ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    if (code === `` || /^[0-9\b]+$/.test(code)) {
      setCodeATI(code);
    } else {
      setCodeATIError(`вводите только цифры`);
    }
  };

  /**
   * обрабатывает событие сабмита формы
   * @param {SyntheticEvent} event событие submit формы
   */
  const handleFormSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
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