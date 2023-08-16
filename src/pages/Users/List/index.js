import HeaderContent from '../../../components/HeaderContent';
import { Container } from './style';
import { People } from '@mui/icons-material';
import ListContent from '../../../components/ListContent';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import * as S from './style';
import EditDelete from '../../../components/Form/EditDelete';
import { arrayToXLSX, formattedDate } from '../../../GeneralFunctions/functions';
import FilterContent from '../../../components/FilterContent';
import FormContent from '../../../components/FormContent';
import InputFormFilter from '../../../components/Form/InputFormFilter';

function UserList() {
  const [data, setData] = useState([]);
  const [columnsExcel, setColumnsExcel] = useState([]);
  const [accessName, setAccessName] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [team, setTeam] = useState(null);
  const { id } = useParams();
  const url = `/users`
  const location = useLocation();

  const [roleOptions, setRoleOptions] = useState('');
  const [teamOptions, setTeamOptions] = useState('');

  function getOptions() {
    get(`/roles`)
      .then(async response => {
        if (response) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          setRoleOptions(response.records);
        }
      });
    get(`/teams`)
      .then(async response => {
        if (response) {
          response.records.map(item => {
            item.value = item.id;
            item.label = item.id + '. ' + item.name
          })
          // setTeamOptions(response.records);
        }
      });
    get(`/users/${id}`)
      .then(async response => {
        let listTeams = []
        if (response) {
          response?.user?.TeamUsers.map(team => {
            let obj = {
              ...team,
              value: team.Team.name,
              label: team.team + '. ' + team.Team.name
            }

            listTeams.push(obj)
          })
          setTeamOptions(listTeams);
        }
      });

  }

  async function loadData() {
    await get(url)
      .then(async response => {
        if (response) {
          setData(response.records);
          let listAux = []
          response.records.map(item => {
            let obj = {
              id: item.id,
              Acesso: item.access_name,
              Nome: item.Person.name,
              Cargo: item.Role.name,
              Criação: formattedDate(item.createdAt),
            }
            listAux.push(obj)
          })
          setColumnsExcel(listAux)
        }
      });
  }

  const columns = [
    {
      name: 'ID',
      selector: row => row.id,
      sortable: true,
      center: true
    },
    {
      name: 'Nome de Acesso',
      selector: row => row.access_name,
      sortable: true,
    },
    {
      name: 'Nome',
      selector: row => row.Person.name,
      sortable: true,
    },
    {
      name: 'Cargo',
      selector: row => row.Role ? row.Role.name : '-',
      sortable: true,
    },
    {
      name: 'Times',
      selector: row =>
        row.TeamUsers ?
          <>
            {row.TeamUsers.map(item => {
              return (
                <>
                  - {item.Team.name}<br></br>
                </>
              )
            })}
          </>
          : '-'
      ,
      sortable: true,
    },
    {
      name: 'Editar/Deletar',
      selector: row => <EditDelete id={row.id} url={url} data={data} setData={setData} />,
      center: true,
      style: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

      },
    },
  ];

  const customStyles = {
    table: {
      style: {
        border: '1px solid black',
      },
    },
    rows: {
      style: {
        minHeight: '72px',
      },
    },
    headCells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    },
  };

  useEffect(() => {
    loadData();
    getOptions();
  }, [])

  return (
    <Container>
      <HeaderContent title="Usuários" icon={<People fontSize="large" />} titleButton="Novo Usuário" linkTo="/users/novo" />
      <FilterContent columnsExcel={columnsExcel} filesheet={"Usuários"} fileName={"users.xlsx"}>
        <InputFormFilter value={accessName} setValue={setAccessName} title="Nome de acesso" type='text' size="small"></InputFormFilter>
        <InputFormFilter value={name} setValue={setName} title="Nome" type='text' size="small"></InputFormFilter>
        <InputFormFilter options={roleOptions} selected={role} setSelected={setRole} value={role} setValue={setRole} title="Cargo" type='select' size="small"></InputFormFilter>
        <InputFormFilter options={teamOptions} selected={team} setSelected={setTeam} value={role} setValue={setRole} title="Time" type='select' size="small"></InputFormFilter>

      </FilterContent>
      <ListContent
        columns={columns}
        data={data}
        customStyles={customStyles}
      />

    </Container>
  )

}

export default UserList;
