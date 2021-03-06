import React, {useState, ChangeEvent, SyntheticEvent, useEffect, useContext} from 'react';
import {IRequest, RequestsContext} from '../../context/requestsContext';
import RequestFormView from '../request-form-view/request-form-view';

/**
 * @memberof UpdateRequestsForm
 * @interface {object} IUpdateRequestsFormProps
 * @property {IRequest} request объект заявки
 * @property {function} onCloseClick callback-функлия на клик по кнопке отмены
 */
interface IUpdateRequestsFormProps {
  request: IRequest,
  onCloseClick: () => void
}

/**
 * @component
 */
const UpdateRequestForm: React.FC<IUpdateRequestsFormProps> = ({request, onCloseClick}) => {
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
   * подаёт запрос на изменение заявки на сервер и диспатчит действие изменения в контекст с заявками
   */
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
  const handleTransporterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransporter(e.target.value);
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
  const handleDateTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setApplyTime(e.target.value);
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