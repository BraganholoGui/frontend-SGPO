import AddTaskButton from './AddTaskButton';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
// import uuid from 'react-uuid';
import * as S from './style'

const Column = ({ tag, currentEvent, events, setEvents }) => {
  return (
    <S.Column>
      {tag}
      {/* <AddTaskButton handleClick={handleAdd} /> */}
      <Droppable droppableId={tag}>
        {(provided, snapshot) => {
          return (
            <S.TaskContainer
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {events
                .find((event) => event.title === currentEvent.title)
                ?.[tag].map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => (
                          <Task
                            name={item.name}
                            details={item.details}
                            id={item.id}
                            provided={provided}
                            snapshot={snapshot}
                            // handleRemove={handleRemove}
                            // handleUpdate={handleUpdate}
                          />
                        )}
                    </Draggable>
                  ))}
              {provided.placeholder}
            </S.TaskContainer>
          );
        }}
      </Droppable>
    </S.Column>
  );
};

export default Column;
