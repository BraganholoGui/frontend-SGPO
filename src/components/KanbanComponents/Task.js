import { useState } from 'react';
import { formattedDate, toast } from '../../GeneralFunctions/functions';
import * as S from './style'
import ModalDelete from '../Modal';
import { del } from '../../services/actions';
// import history from '../../history';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Task = ({ name, details, item, id, provided, handleRemove }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [idDelete, setIdDelete] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const history = useHistory()
  const toggle = () => {
    setOpenModalDelete(!openModalDelete)
  };

  const allowDel = (allow) => {
    if (allow) {
     del('/tasks', idDelete)
       .then(() => {
         toast('success', `Deletado com sucesso!`);
         history.push('/tasks')
       })
       .catch(err => {
         toast('error', err.reason || `Error ao deletar o registro :(`);
       })
       setOpenModalDelete(false)
   }
 };
  

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
      <S.TaskDetailsResponse other={item.user != user.id ? true : false}>
        Responsável: {item.User && item.User.Person ? item.User.Person.name  : null}
        {console.log('itwm',item)}
        {console.log(user)}
      </S.TaskDetailsResponse>
      <S.TaskDetails>
        Criado por: {item.createdBy && item.createdBy.Person ? item.createdBy.Person.name  : null}
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
       <S.RemoveBar onClick={(e) => {setIdDelete(id); toggle();}}>
          -
        </S.RemoveBar>
        <ModalDelete
        openModalDelete={openModalDelete} setOpenModalDelete={setOpenModalDelete} toggle={toggle} allowDel={allowDel}
      />
      </S.ContainerActions>
    </S.Task>
  );
};

export default Task;
