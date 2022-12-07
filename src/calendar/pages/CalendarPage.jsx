import React, { useState } from 'react';
import { Calendar} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { NavBar , CalendarEvent, CalendarModal } from '../';
import { localizer, getMessagesES  } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';
import { FabAddNew, FabDelete } from '../../calendar';

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events, hasEventSelected, setActiveEvent } = useCalendarStore();

  const eventStyleGetter = (event, start,end, isSelected )=>{
    const style = {
      backgoundColor : '#FF0000',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  };
  // const events = [{
  //   title: 'Cumpleaños',
  //   notes: 'Comprar regalo',
  //   start: new Date(),
  //   end: addHours(new Date(), 2),
  //   bgColor: '#fafafa',
  //   user: {
  //     _id : '123',
  //     name: 'Felipe'
  //   }
  // }];

  const [lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'week');

  const onDoubleClick = (event) => {
    // console.log( {doubleClick: event});
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged= (event) => {
    localStorage.setItem('lastView', event);
    setLastView( event );
  }

  return (
    <>
      <NavBar/>
      <Calendar
         culture='es'
         localizer={localizer}
         events={events}
         defaultView={ lastView }
         startAccessor="start"
         endAccessor="end"
         style={{ height: 'calc(100vh - 80px)' }}
         messages={ getMessagesES() }
         eventPropGetter={ eventStyleGetter }
         components={{ event: CalendarEvent }}
         onDoubleClickEvent={ onDoubleClick }
         onSelectEvent={ onSelect }
         onView={ onViewChanged }
    />
    <CalendarModal/>
    <FabDelete/>
    <FabAddNew/>
    </>
  )
}