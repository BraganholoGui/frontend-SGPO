import { formattedDate } from '../../GeneralFunctions/functions';
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
          {name} - {item ? formattedDate(item.start) : null}
        </S.TaskNameInformation>
      </S.TaskName>
      <S.TaskDetails>Descrição: {details}</S.TaskDetails>
      <S.TaskDetails>
        Responsável: {item.User && item.User.Person ? item.User.Person.name  : null}
      </S.TaskDetails>
      <S.TaskDetails>
        Prioridade: {item  && item.Priority ? item.Priority.name  : null}
      </S.TaskDetails>
      <S.TaskDetails>
        Tema: {item  && item.Theme ? item.Theme.name  : null}
      </S.TaskDetails>
      <S.TaskDetails>
        Prazo: {item ? formattedDate(item.end) : null}
      </S.TaskDetails>
      <S.TaskDetails>
        Criação: {item ? formattedDate(item.createdAt) : null}
      </S.TaskDetails>
      <S.ContainerActions>
      <a href={`/tasks/${id}`} style={{textDecoration:'none'}}>
        <S.EditBar>
          -
        </S.EditBar>
        </a>
       <S.RemoveBar onClick={(e) => handleRemove(id, e)}>
          -
        </S.RemoveBar>
      </S.ContainerActions>
    </S.Task>
  );
};

export default Task;
