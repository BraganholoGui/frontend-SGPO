import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import uuid from 'react-uuid';
import * as S from './style'
import { useEffect, useState } from 'react';
import history from '../../history';

const Column = ({ tag, currentEvent, events, setEvents }) => {
  const [updateToggle, setUpdateToggle] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [removeToggle, setRemoveToggle] = useState('');
  const toggle = () => { setRemoveToggle(!removeToggle) }

  function handleRemove(id) {
    setRemoveToggle(true)
  }

  useEffect(() => {
    setAllEvents(events)
  }, [events]);

  return (
    <S.Column>
      {tag}
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <S.TaskContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {events
                .find((event) => event.title == currentEvent.title)
                ?.[tag].map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id.toString()}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <>
                      {console.log(item)}
                        <Task
                          name={item.name}
                          item={item}
                          details={item.details}
                          id={item.id}
                          provided={provided}
                          snapshot={snapshot}
                          handleRemove={handleRemove(item.id)}
                        />
                      </>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </S.TaskContainer>
          );
        }}
      </Droppable>
    </S.Column>
  );
};

export default Column;
