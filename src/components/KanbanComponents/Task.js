import * as S from './style'

const Task = ({ name, details, item, id, provided, handleRemove }) => {
  return (
    <S.Task
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <S.TaskName>
        <S.TaskNameInformation>
          {name}
        </S.TaskNameInformation>
        <S.TaskNameInformation>
           {item ? item.start : null}

        </S.TaskNameInformation>
      </S.TaskName>
      <S.TaskDetails>{details}</S.TaskDetails>
      <S.RemoveBar onClick={(e) => handleRemove(id, e)}>
        -
      </S.RemoveBar>
    </S.Task>
  );
};

export default Task;
