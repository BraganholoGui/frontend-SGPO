import HeaderContent from '../../../components/HeaderContent';
import { People, ToggleOnTwoTone } from '@mui/icons-material';
import { get } from '../../../services/actions';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as S from './style';
import InputForm from '../../../components/Form/InputForm';
import FormContent from '../../../components/FormContent';
import ButtonForm from '../../../components/Form/ButtonForm';
import ImageUploader from '../../../components/ImageUploader';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

function User() {
  const { id } = useParams();
  const url = '/users';
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [accessName, setAccessName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [team, setTeam] = useState('');
  const [role, setRole] = useState('');
  const [userProfile, setUserProfile] = useState('');

  const [roleOptions, setRoleOptions] = useState('');
  const [teamOptions, setTeamOptions] = useState('');
  const [openPhoto, setOpenPhoto] = useState('');

  const togglePhoto = () =>{
    setOpenPhoto(!openPhoto)
  }

  async function loadData() {
    if (id != 'novo') {
      get(`/users/${id}`)
        .then(async response => {
          if (response) {
            setData(response.user);
          }
        });
    }
  }

  function updateStorage() {

    let userStorage = JSON.parse(localStorage.getItem('user'))
    get(`/roles/${role?.id}`)
      .then(async response => {
        userStorage = {
          ...userStorage,
          Role: response.role
        }
      });
  }

  function buildSubmitObj() {

    let obj = {
      contact: {
        id: data.Person && data.Person.Contact ? data.Person.Contact.id : null,
        email: email,
        phone: phone,
      },
      person: {
        id: data.Person ? data.Person.id : null,
        name: name
      },
      access_name: accessName,
      password: password,
      team: team ? team.id : null,
      role: role ? role.id : null,
      photo: userProfile ? userProfile : null,
    }
    console.log(obj)

    return obj;
  }

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
          response?.user?.TeamUsers?.map(team => {
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

  useEffect(() => {
    loadData();
    getOptions();
  }, [])


  useEffect(() => {
    setName(data.Person && data.Person ? data.Person.name : '');
    setPassword(data.password_hash);
    setUserProfile(data.photo);
    setAccessName(data.access_name);
    setEmail(data.Person && data.Person.Contact ? data.Person.Contact.email : '');
    setPhone(data.Person && data.Person.Contact ? data.Person.Contact.phone : '');
    let roleSelected;
    let teamSelected;
    if (teamOptions.length > 0 && data.Team) {
      teamSelected = teamOptions.find(item => item.id == data.Team.id)
    }
    if (roleOptions.length > 0 && data.Role) {
      roleSelected = roleOptions.find(item => item.id == data.Role.id)
    }
    setTeam(teamSelected);
    setRole(roleSelected);
  }, [data, teamOptions, roleOptions])

  return (
    <>
      <S.Container>
        <HeaderContent id={id} titleButton="Voltar" linkTo="/users" title={id == "novo" ? "Novo Usuário" : "Editar Usuário"} icon={<People fontSize="large" />} />
        <FormContent>
          <S.ContentBox>
            <ImageUploader value={userProfile} setValue={setUserProfile} onClick={togglePhoto}/>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={accessName} setValue={setAccessName} title="Nome de acesso" type='text' size="small"></InputForm>
            <InputForm value={name} setValue={setName} title="Nome" type='text' size="small"></InputForm>
            <InputForm value={email} setValue={setEmail} title="Email" type='email' size="small"></InputForm>
          </S.ContentBox>
          <S.ContentBox>
            <InputForm value={phone} setValue={setPhone} title="Telefone" type='phoneMask' size="small"></InputForm>
            {id != 'novo' ?
              <InputForm options={teamOptions} selected={teamOptions} isMulti={true} readOnly={true} setSelected={setTeam} value={team} setValue={setTeam} title="Times" type='select' size="small"></InputForm>
              :
              null
            }
            <InputForm options={roleOptions} selected={role} setSelected={setRole} value={role} setValue={setRole} title="Cargo" type='select' size="small"></InputForm>
          </S.ContentBox>
          <ButtonForm url={url} obj={buildSubmitObj()} redefinePassword />
        </FormContent>
       
      </S.Container>
    </>
  )

}
export default User;
