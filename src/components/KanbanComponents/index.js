import React, { useMemo, useState, useCallback, useEffect } from 'react';
import TaskBox from './TaskBox';
import { get } from '../../services/actions';

function Kanban(props) {
  const url = `/tasks`
  const [data, setData] = useState(props.data);
  const [events, setEvents] = useState(() => {
    return localStorage.getItem('events')
      ? JSON.parse(localStorage.getItem('events'))
      : initEvent;
  });

  useEffect(() => {
    setData(props.data);
    let eventAux = [
      {
        title: 'Tasks',
        ['Pendente']: [],
        ['Fazendo']: [],
        ['Finalizado']: [],
      },
    ];
    props.data.map(item =>{
      if(item.status ==1){
        eventAux[0]['Pendente'].push(item)
      }else if(item.status == 2){
        eventAux[0]['Fazendo'].push(item)
      }else{
        eventAux[0]['Finalizado'].push(item)
      }
    })
    setEvents(eventAux)
  }, [props]);
  
  const initEvent = useMemo(() => [
    {
      title: 'Add a new Event',
      ['Pendente']: [],
      ['Fazendo']: [],
      ['Finalizado']: [],
    },
  ], []);

  const [currentEvent, setCurrentEvent] = useState(events[0]);

  const updateEvents = useCallback(async () => {
    try {
      if (!events.length) {
        await localStorage.setItem('events', JSON.stringify(initEvent));
        setEvents(JSON.parse(localStorage.getItem('events')));
      } else {
        await localStorage.setItem('events', JSON.stringify(events));
      }
    } catch (e) {
      console.error('Failed to modify events!');
    }
  }, [events]);

  // Set localStorage
  useEffect(() => {
    updateEvents();
  }, [events]);

  return (
    <div className='App'>
      {/* <EventBar
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      /> */}
      <TaskBox
        events={events}
        setEvents={setEvents}
        currentEvent={currentEvent}
        setCurrentEvent={setCurrentEvent}
      />
    </div>
  );
}

export default Kanban;
