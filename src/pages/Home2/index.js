import React, { useEffect, useState } from 'react';
import * as S from './styles'
import DataTable from "react-data-table-component";
import { FaPencilAlt, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { Modal, ModalBody } from 'reactstrap';
import EditClient from '../../Modal/EditClient'
import { useAuth } from '../../contexts/auth';

function Home() {
  const [userList, setUserList] = useState([]);
  const [clientSelected, setClientSelected] = useState({});
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal)
  const { signed, Logout } = useAuth();

  const customStyles = {
    headCells: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        fontSize: '15px',
        color: '#466486',
      },
    },
    rows: {
      style: {
        backgroundColor: '#ffffff',
        fontSize: '15px',

      },
      stripedStyle: {
        backgroundColor: '#dbe7f1',
      },
    },
    cells: {
      style: {
        color: '#466486',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
    },
    noData: {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#466486',
      },
    }
  };

  const columns = [
    {
      name: "Nome",
      selector: (row: any) => row.name,
      sortable: true,
      grow: 2,
      wrap: true
    },
    {
      name: "Data",
      selector: (row: any) => {
        const ndate = formatDate(new Date())
        return (
          <>
            {ndate}
          </>
        )
      },
      sortable: true,
      grow: 1.3,
      wrap: true
    },
    {
      name: "Documento",
      selector: (row: any) => row.document,
      sortable: true,
      grow: 2,
      wrap: true
    },
    {
      name: "Banco",
      selector: (row: any) => row.bank.bankName,
      sortable: true,
      grow: 1.5,
      wrap: true
    },
    {
      name: "Agência",
      selector: (row: any) => row.bank.agency,
      sortable: true,
      grow: 1.5,
      wrap: true
    },
    {
      name: "Conta",
      selector: (row: any) => row.bank.account,
      sortable: true,
      grow: 1.5,
      wrap: true
    },
    {
      name: "Editar",
      selector: (row: any) => <S.ButtonEdit><FaPencilAlt onClick={() => { toggleModal(); setClientSelected(row) }} /></S.ButtonEdit>,
      sortable: true,
      grow: 1,
      wrap: true
    },
  ];

  const formatDate = (date: any) => {
    let dateFormated = '';
    const ndata = ((addZero(date.getDate()))) + "/" + (addZero(date.getMonth() + 1)) + "/" + date.getFullYear();
    dateFormated = ndata;
    return dateFormated
  }

  function addZero(number: number) {
    if (number <= 9)
      return "0" + number;
    else
      return number;
  }

  useEffect(() => {
    if (localStorage.clientList) {
      setUserList(JSON.parse(localStorage.clientList));
    } else {
      Logout();
    }
  }, []);

  async function handleLogout() {
    Logout();
  }
  return (
    <S.ContainerHome>
      <S.Header>
        <S.HeaderTitle>
          <FaUsers className='iconTitle' />Lista de Clientes
        </S.HeaderTitle>
        <S.HeaderTitle>
          <S.ButtonForm onClick={handleLogout}>Logout<FaSignOutAlt className='iconButton' /></S.ButtonForm>
        </S.HeaderTitle>
      </S.Header>
      <S.ContainerTable>
        <DataTable
          columns={columns}
          data={userList}
          pagination
          striped
          noHeader
          customStyles={customStyles}
          responsive
          paginationComponentOptions={{ rowsPerPageText: 'Linhas por página:' }}
          paginationIconLastPage={null}
          paginationIconFirstPage={null}
        />
        <Modal
          fade
          centered
          zIndex='99999'
          scrollable={true}
          isOpen={modal}
          toggle={toggleModal}
          style={{ borderRadius: '50px' }}
        >
          <ModalBody
            style={{ borderRadius: '0', padding: '0' }}
          >
            <EditClient
              clientSelected={clientSelected}
              setModal={setModal}
              setUserList={setUserList}
              userList={userList}
            />
          </ModalBody>
        </Modal>
      </S.ContainerTable>
    </S.ContainerHome>

  );
}

export default Home;
