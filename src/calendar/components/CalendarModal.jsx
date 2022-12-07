import ReactDOM from 'react-dom';
import React, { useEffect, useMemo, useState } from 'react'
import Modal from 'react-modal';
import { addHours, differenceInSeconds } from 'date-fns';
import DatePicker, {registerLocale} from 'react-datepicker';
import es from 'date-fns/locale/es'
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es',es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');


export const CalendarModal = () => {

  const [ formSubmitted, setFormSubmitted] = useState(false);
  const {activeEvent, startSavingEvent } = useCalendarStore();

  const {isDateModalOpen , closeDateModal } = useUiStore();

  // const [isOpen, setIsOpen ] = useState(true);
  const onCloseModal = () => {
    closeDateModal();
    // console.log('cerrando modal');
    // setIsOpen(false);
  }

  const [formValues, setFormValues] = useState( {
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [ activeEvent ]);
  

  const onInputChanged= ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChaged = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event
    })
  }

  const InicioValidationClass = useMemo( ()=>{
    if(!formSubmitted) return '';
    const difference = differenceInSeconds(new Date(), formValues.start);
    return (isNaN(difference))
      ? 'is-invalid'
      : 'is-valid';
  },[formValues.start, formSubmitted])

  const EndValidationClass = useMemo( ()=>{
    if(!formSubmitted) return '';
    const difference = differenceInSeconds(formValues.end, formValues.start);
    return (isNaN(difference) || difference <= 0)
      ? 'is-invalid'
      : 'is-valid';
  },[formValues.end, formSubmitted])
  
  const titleValidationClass = useMemo( ()=>{

    if(!formSubmitted) return '';
    return (formValues.title.length > 0)
      ? 'is-valid'
      : 'is-invalid';

  },[formValues.title, formSubmitted])

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference)) {
      Swal.fire('Error Fecha','error en formato de fecha');
      return;
    }
    if (difference <= 0) {
      Swal.fire('Error Fecha','Fecha de termino anterior a inicio');
      return;
    }
    if (formValues.title.length <= 0) {
      Swal.fire('Error titulo','Debe ingresar el título');
      return;
    }
    console.log(formValues);

    // TODO mostrar guardando
    await startSavingEvent( formValues );
    closeDateModal();
  }

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={ 200 }
    >
      <h1> Nuevo evento </h1>
<hr />
<form className="container" onSubmit={ onSubmit }>

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        <DatePicker
          locale="es"
          selected={ formValues. start }
          onChange={ (event) => onDateChaged(event,'start') }
          className={ `form-control ${InicioValidationClass}`}
          dateFormat="Pp"
          showTimeSelect
          timeCaption='Hora'
        />
    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        <DatePicker
          locale="es"
          minDate={formValues.start}
          selected={ formValues.end }
          onChange={ (event) => onDateChaged(event,'end') }
          className={ `form-control ${EndValidationClass}`}
          dateFormat="Pp"
          showTimeSelect
          timeCaption='Hora'
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className={ `form-control ${ titleValidationClass}` }
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChanged }

        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChanged }
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
      </Modal>
  )
}
