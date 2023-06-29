import React, { useCallback } from 'react';
import Column from './Column';
import { DragDropContext } from 'react-beautiful-dnd';
import * as S from "./style"
import { put } from '../../services/actions';
import { toast } from '../../GeneralFunctions/functions';

const TaskBox = ({ events, setEvents, currentEvent, setCurrentEvent }) => {

  function updateStatusTask(id, destination){
    let newStatus;
    if(destination == 'Pendente'){
      newStatus = 1;
    }else if(destination == "Andamento"){
      newStatus = 2;
    }else{
      newStatus = 3;
    }
    let obj ={
      status:newStatus
    }
    put(`tasks/${id}`, obj)
        .then(() => {
          // toast('success', `Atualizado com sucesso!`);
          // history.goBack()
          
        }).catch((err) => {
          toast('error', err.reason || `Error ao atualizar o registro :(`);
        });
  }

  const handleDragEnd = useCallback((result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const curEvent = events.find((item) => item.title === currentEvent.title);
    const taskCopy = curEvent[source.droppableId][source.index];
    updateStatusTask(result.draggableId, result.destination.droppableId)
    setEvents((prev) =>
      prev.map((event) => {
        if (event.title === currentEvent.title) {
          let eventCopy = { ...event };
          const taskListSource = event[source.droppableId];
          taskListSource.splice(source.index, 1);
          eventCopy = { ...event, [source.droppableId]: taskListSource };
          const taskListDes = event[destination.droppableId];
          taskListDes.splice(destination.index, 0, taskCopy);
          eventCopy = { ...event, [destination.droppableId]: taskListDes };
          return eventCopy;
        } else {
          return event;
        }
      })
    );
  }, [events, setEvents, currentEvent]);

  return (
    <div>
      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <S.TaskBoxBody>
          {
            ['Pendente', 'Andamento', 'Finalizado'].map(tag => (
              <Column 
                key={tag}
                tag={tag}
                events={events}
                setEvents={setEvents}
                currentEvent={currentEvent}
              />
            ))
          }
        </S.TaskBoxBody>
      </DragDropContext>
    </div>
  );
};

export default TaskBox;
