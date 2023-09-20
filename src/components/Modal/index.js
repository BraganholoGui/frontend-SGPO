import React, { useState } from 'react';
import * as S from './style';
import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from 'react';
import {
  BarChart, Task, AccountTree, ShoppingCart,
  Loyalty,
  Inventory,
  Category,
  Person,
  Groups,
  Psychology,
  People
} from '@mui/icons-material';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const ModalDelete = (props) => {
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);

  useEffect(() => {
    setOpenModalDelete(props.openModalDelete);
  }, [props])

  const allowDel = () => {
    setDeleteItem(true)
    props.setDeleteItem(true)
  };

  return (
    <Modal
      isOpen={openModalDelete}
      toggle={props.toggle}
      centered
    >
      <ModalHeader style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        Tem certeza que deseja deletar esse item?
      </ModalHeader>
      <ModalBody style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <S.ButtonCancel onClick={props.toggle}>
          CANCELAR
        </S.ButtonCancel>
        <S.ButtonDelete onClick={() => props.allowDel(true)} >
          DELETAR
        </S.ButtonDelete>
      </ModalBody>
    </Modal>
  )
}
export default ModalDelete;
